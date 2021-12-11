const express = require("express");
const router = express.Router();
const { getAllPosts, deletePost } = require("../controller/post.controller");

router.get("/:userId", (req, res) => {
  getAllPosts(req, res);
});

router.delete("/", (req, res) => {
  deletePost(req, res);
});
module.exports = router;
