const express = require("express");
const {
  getAllJobs,
  deleteJob,
  updateJob,
  updateJobStatus,
  applyJob,
} = require("../controller/jobs.controller");
const router = express.Router();

/** get jobs by user id */
router.get("/:userId", (req, res) => {
  getAllJobs(req, res);
});

router.delete("/", (req, res) => {
  deleteJob(req, res);
});

router.put("/", (req, res) => {
  updateJob(req, res);
});
router.put("/status", (req, res) => {
  updateJobStatus(req, res);
});

router.post("/apply", (req, res) => {
  applyJob(req, res);
});
module.exports = router;
