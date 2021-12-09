const puppeteer = require("puppeteer");
const { sleepFor } = require("./utils");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const FACEBOOK_LOGIN_URL = process.env.FACEBOOK_URL;

const runFacebookCrawling = async (req, res) => {
  try {
    /** launch chromium */
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });
    const context = browser.defaultBrowserContext();
    context.overridePermissions("https://www.facebook.com", ["notifications"]);
    /** open a new tab */
    const page = await browser.newPage();

    /** remove 30 seconds default limit time for page loading */
    page.setDefaultNavigationTimeout(60000);

    /** navigate to linkdein site */
    await page.goto(FACEBOOK_LOGIN_URL, { waitUntil: "networkidle2" });

    /** login to facebook */
    await login(page, req.user);
    await page.waitForNavigation();
    await sleepFor(page, 1000, 2000);

    /** navigate to the group page */
    await navigateToGroupPage(page, req.body.groupPath);
    await sleepFor(page, 2000, 4000);

    /**extract posts */
    const extracted = await extractPosts(page);
    const filtered = extracted.filter((post) =>
      post.toLowerCase().includes(req.body.job.toLowerCase())
    );
    const posts = preparePosts(filtered);
    const stored = await storePosts(req.user._id, posts);
    res.status(200).send(stored);
  } catch (error) {}
};

const login = async (page, user) => {
  await page.type("#email", user.username, { delay: 100 });
  await page.type("#pass", user.password, { delay: 100 });
  await page.click('button[name="login"]');
};

const navigateToGroupPage = async (page, path) => {
  const groupUrl = `${page.url()}${path}?sorting_setting=CHRONOLOGICAL`;
  await page.goto(groupUrl, { waitUntil: "networkidle2" });
};

const scrollDown = async (page) => {
  await page.evaluate(() => window.scrollBy(0, 1300));
};

const extractPosts = async (page) => {
  await scrollDown(page);
  // const extractedElements = await page.$$("[aria-posinset]");
  await page.evaluate(() => {
    document.querySelectorAll("[aria-posinset]").forEach((element) => {
      element.querySelectorAll('[role="button"]').forEach((b) => {
        if (b.innerText === "See more") {
          b.click();
        }
      });
    });
  });

  const posts = await page.evaluate(() => {
    let result = [];

    /** loop over posts */
    document.querySelectorAll("[aria-posinset]").forEach((element) => {
      const job = {};
      result.push(element.innerText);
    });
    return result;
  });

  return posts;
};

const preparePosts = (posts) => {
  return posts.map((post) => {
    const index = post.indexOf("Like");
    if (index != -1) return post.substring(0, index);

    return post;
  });
};

const storePosts = async (userId, posts) => {
  const user = await User.findById(userId);

  for (let post of posts) {
    const found = await User.findOne({
      _id: user._id,
      posts: { $elemMatch: { description: post } },
    });
    if (!found) {
      const storedPost = new Post({ description: post });
      user.posts.push(storedPost);
    }
  }
  return await user.save();
};

module.exports = {
  runFacebookCrawling,
};
