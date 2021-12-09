const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const decryptByPlatform = require("../middleware/decryptByPlatform");
const { runLinkedinCrawling } = require("../controller/linkedin.controller");
const { runFacebookCrawling } = require("../controller/facebook.controller");

router.post("/linkedin", [auth, decryptByPlatform], (req, res) => {
  runLinkedinCrawling(req, res);
});

router.post("/facebook", [auth, decryptByPlatform], (req, res) => {
  runFacebookCrawling(req, res);
});

module.exports = router;
