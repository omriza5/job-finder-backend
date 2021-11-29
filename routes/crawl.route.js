const express = require("express");
const router = express.Router();
const { runLinkedinCrawling } = require("../controller/linkedin.controller");
const { runFacebookCrawling } = require("../controller/facebook.controller");

router.post("/linkedin", (req, res) => {
  runLinkedinCrawling(req, res);
});

router.post("/facebook", (req, res) => {
  runFacebookCrawling(req, res);
});

module.exports = router;
