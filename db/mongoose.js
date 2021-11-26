const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/jobFinder", () => {
    console.log("Connected to mongodb...");
  });
};
