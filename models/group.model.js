const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  label: {
    type: String,
    minlength: "3",
    required: true,
  },
  url: {
    type: String,
    minlength: "3",
    required: true,
  },
  path: {
    type: String,
    minlength: "3",
    required: true,
  },
});

const Group = mongoose.model("Group", groupSchema);

module.exports = {
  Group,
  groupSchema,
};
