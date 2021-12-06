const express = require("express");
const { getAllJobs } = require("../controller/jobs.controller");
const router = express.Router();

/** get jobs by user id */
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  getAllJobs(req, res, userId);
});

module.exports = router;
