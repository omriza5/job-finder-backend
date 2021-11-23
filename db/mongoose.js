const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect("mongodb://localhost:27017/linkedin", () => {
    console.log("Connected to mongodb...");
  });
};
