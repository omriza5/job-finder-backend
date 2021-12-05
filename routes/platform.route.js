const express = require("express");
const router = express.Router();
const {
  getPlatforms,
  createPlatform,
} = require("../controller/platform.controller");

router.get("/", (req, res) => {
  getPlatforms(req, res);
});

router.post("/", (req, res) => {
  createPlatform(req, res);
});
module.exports = router;
