const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.DB_PRODUCTION_URL, () => {
    console.log("Connected to mongodb...");
  });
};
