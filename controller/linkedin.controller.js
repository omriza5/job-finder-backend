const puppeteer = require("puppeteer");
const { sleepFor } = require("./utils");
const { storeJobs } = require("../controller/jobs.controller");

const LINKEDIN_LOGIN_URL = process.env.LINKEDIN_URL;

const runLinkedinCrawling = async (req, res) => {
  try {
    const { job, location, datePosted, experienceLevel } =
      req.body.filterOptions;

    /** launch chromium */
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
    });

    /** open a new tab */
    const page = await browser.newPage();

    /** remove 30 seconds default limit time for page loading */
    page.setDefaultNavigationTimeout(60000);

    /** navigate to linkdein site */
    await page.goto(LINKEDIN_LOGIN_URL, { waitUntil: "networkidle2" });

    /** login to linkedin */
    await login(page, req.user); /** uncomment later */
    await page.waitForNavigation();

    /** go to jobs search page */
    await navigateToJobsPage(page);
    await page.waitForNavigation();

    /** set search query */
    await setSearchQuery(page, job);

    /** set job location  */
    await setLocatoin(page, location);

    /** search button click*/
    searchBtnClick(page);
    await sleepFor(page, 2000, 4000);

    /** set date posted property */
    setDatePosted(page, datePosted);
    await page.waitForTimeout(4000);

    /**  set experience level */
    setExperienceLevel(page, experienceLevel);
    await page.waitForNavigation();
    await sleepFor(page, 2000, 4000);

    /** pick all jobs*/
    const jobs = await extractJobs(page);

    /**store jobs in db */
    const updatedUser = await storeJobs(jobs, req.user._id, req.body.platform);

    res.status(200).send(updatedUser);
  } catch (error) {
    console.log("ERROR: ", error);
    return res.status(500).send(error);
  }
};

const login = async (page, user) => {
  await page.type("#username", user.username, { delay: 100 });
  await page.type("#password", user.password, { delay: 100 });
  await page.click(".btn__primary--large.from__button--floating");
};

const setSearchQuery = async (page, job) => {
  const searchInputs = await page.$x(
    '//input[@aria-label="Search by title, skill, or company"]'
  );
  if (searchInputs.length > 0) {
    await searchInputs[0].focus();
    await searchInputs[0].type(job, { delay: 100 });
  }
};
const setLocatoin = async (page, location) => {
  const locationInputs = await page.$x(
    '//input[@aria-label="City, state, or zip code"]'
  );

  if (locationInputs.length > 0) {
    await locationInputs[0].focus();
    await locationInputs[0].type(location, { delay: 100 });
    await page.keyboard.press("Enter", { delay: 2000 });
  }
};

const searchBtnClick = async (page) => {
  const searchBtn = await page.$(
    "#global-nav-search>div>div.jobs-search-box__container.jobs-search-box>button.jobs-search-box__submit-button.artdeco-button.artdeco-button--2.artdeco-button--secondary"
  );

  await searchBtn.click();
};

const setDatePosted = async (page, datePosted) => {
  if (datePosted === "Any Time") return;
  const dateInput = await page.$(
    "#search-reusables__filters-bar>ul>li:nth-child(3)>div>span>button"
  );
  await dateInput.click();
  switch (datePosted) {
    case "Past 24 hours":
      await page.evaluate(() => {
        document.querySelector("#timePostedRange-r86400").click();
      });
      break;
    case "Past Week":
      await page.evaluate(() => {
        document.querySelector("#timePostedRange-r604800").click();
      });
      break;
    case "Past Month":
      await page.evaluate(() => {
        document.querySelector("#timePostedRange-r2592000").click();
      });
      break;

    default:
      return null;
  }
  await page.evaluate(() => {
    document
      .querySelector(
        ".artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml2"
      )
      .click();
  });
};
const setExperienceLevel = async (page, experienceLevel) => {
  const experiencBtn = await page.$(
    "#search-reusables__filters-bar>ul>li:nth-child(4)>div>span>button"
  );
  await experiencBtn.click();

  switch (experienceLevel) {
    case "Internship":
      await page.evaluate(() => {
        document.querySelector("#experience-1").click();
      });
      break;
    case "Entry level":
      await page.evaluate(() => {
        document.querySelector("#experience-2").click();
      });
      break;

    default:
      return null;
  }

  // await page.evaluate(() => {
  //   const experiencBtn = document.querySelector(
  //     "#search-reusables__filters-bar>ul>li:nth-child(4)>div>span>button"
  //   );
  // });
  experiencBtn.click();
};

const navigateToJobsPage = async (page) => {
  const jobsBtn = await page.$("#global-nav>div>nav>ul>li:nth-child(3)>a");
  await jobsBtn.click();
};

const extractJobs = async (page) => {
  let jobs = [];

  /**define numOf pages */
  const numOfPages = await page.evaluate(() => {
    const pages = document
      .querySelector(".display-flex.t-12.t-black--light.t-normal")
      .innerText.split(" ")[0];
    return Math.ceil(Number(pages) / 25);
  });
  for (let i = 0; i < numOfPages; i++) {
    await scrollToBottom(page);
    /** extract jobs per page */
    const pageResult = await page.evaluate(() => {
      const items = [];
      const extractedElements = document.querySelectorAll(
        ".jobs-search-results .jobs-search-results__list-item"
      );

      for (let element of extractedElements) {
        if (element.children[0]) {
          const job = element.children[0].children[0];

          items.push({
            key: job.dataset.jobId,
            title:
              job.querySelector(
                ".job-card-container__link.job-card-list__title"
              ) &&
              job.querySelector(
                ".job-card-container__link.job-card-list__title"
              ).innerText,
            company:
              job.querySelector(".job-card-container__company-name") &&
              job.querySelector(".job-card-container__company-name").innerText,
            mode:
              job.querySelector(
                ".job-card-container__metadata-item--workplace-type"
              ) &&
              job.querySelector(
                ".job-card-container__metadata-item--workplace-type"
              ).innerText,
            location:
              job.querySelector(".job-card-container__metadata-item") &&
              job.querySelector(".job-card-container__metadata-item").innerText,
            link: job.querySelector(".job-card-list__title").href,
          });
        }
      }
      return items;
    });

    /** add jobs page  */
    jobs = [...jobs, ...pageResult];
    const thereIsMoreThanOnePage = await page.evaluate(() => {
      return document.querySelector(".active.selected");
    });

    /** move to next page if there more than one page */
    if (thereIsMoreThanOnePage) {
      await page.evaluate(async () => {
        if (document.querySelector(".active.selected").nextElementSibling) {
          const pageBtn =
            document.querySelector(".active.selected").nextElementSibling
              .children[0];
          await pageBtn.click();
        }
      });
    }
  }

  return jobs;
};

const scrollToBottom = async (page) => {
  await page.evaluate(async () => {
    let scrollYInPx = 200;
    const section = document.querySelector(".jobs-search-results");
    for (let i = 0; i < 15; i++) {
      section.scroll(0, scrollYInPx);

      /** make the scroll slow  */
      await new Promise(function (resolve) {
        setTimeout(resolve, 500);
      });
      scrollYInPx += 200;
    }
  });
};
module.exports = {
  runLinkedinCrawling,
};
