const express = require("express");
const router = express.Router();
const { auth } = require("../controller/auth.controller");
router.post("/", (req, res) => {
  auth(req, res);
});

module.exports = router;
