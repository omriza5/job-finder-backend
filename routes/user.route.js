const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/user.controller");

router.post("/", async (req, res) => {
  createUser(req, res);
});
module.exports = router;
