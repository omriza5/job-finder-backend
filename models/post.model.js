const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: {
    type: String,
    minlength: "3",
  },
  isRelevant: {
    type: Boolean,
    default: true,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
  Post,
  postSchema,
};
