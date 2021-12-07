const express = require("express");

const { getAllJobs, deleteJob } = require("../controller/jobs.controller");
const router = express.Router();

/** get jobs by user id */
router.get("/:userId", (req, res) => {
  getAllJobs(req, res);
});

router.delete("/", (req, res) => {
  deleteJob(req, res);
});
module.exports = router;
