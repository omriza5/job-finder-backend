const express = require("express");
const router = express.Router();
const { getGroups } = require("../controller/group.controller");

router.get("/", (req, res) => {
  getGroups(req, res);
});

module.exports = router;
