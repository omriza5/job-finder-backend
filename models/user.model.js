const mongoose = require("mongoose");
const { jobSchema } = require("./job.model");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 3,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    minlength: 8,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  linkedinUsername: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    lowercase: true,
  },
  linkedinPassword: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  facebookUsername: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
    lowercase: true,
  },
  facebookPassword: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  jobs: [jobSchema],
});

const User = mongoose.model("User", userSchema);

module.exports = {
  User,
};
