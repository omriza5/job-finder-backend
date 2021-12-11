const mongoose = require("mongoose");
const { platformSchema } = require("../models/platform.model");
const jobSchema = new mongoose.Schema({
  key: {
    type: String,
    // unique: true,
    default: null,
  },
  title: {
    type: String,
    minlength: 3,
    trim: true,
    required: true,
  },
  company: {
    type: String,
    minlength: 3,
    trim: true,
    default: null,
  },
  location: {
    type: String,
    minlength: 3,
    trim: true,
    default: null,
  },
  link: {
    type: String,
    minlength: 10,
    trim: true,
    default: null,
  },
  mode: {
    type: String,
    minlength: 3,
    trim: true,
    default: null,
  },
  applied: {
    type: Boolean,
    default: false,
  },
  isRelevant: {
    type: Boolean,
    default: true,
  },
  applyDate: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    default: null,
  },
  platform: {
    type: platformSchema,
    required: true,
  },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = {
  Job,
  jobSchema,
};
