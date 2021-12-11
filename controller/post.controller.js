const { User } = require("../models/user.model");

/** get relevant posts by user id */
const getAllPosts = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const relevantPosts = user.posts.filter((p) => p.isRelevant);
    res.status(200).send(relevantPosts);
  } catch (error) {}
};

const deletePost = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        posts: { $elemMatch: { _id: req.body.postId } },
      },
      { $set: { "posts.$.isRelevant": false } },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = {
  getAllPosts,
  deletePost,
};
