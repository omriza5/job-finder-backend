const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_DEV_URL, () => {
    console.log("Connected to mongodb...");
  });
};
