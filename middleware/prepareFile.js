const multer = require("multer");
const path = require("path");
const upload = multer({ dest: "/uploads/" });
const storeFile = async (req, res, next) => {
  if (!req.files) {
    return res.status(500).send("file is not found");
  }
  try {
  } catch (error) {}
};

module.exports = storeFile;
