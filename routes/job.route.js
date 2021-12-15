const express = require("express");
const {
  getAllJobs,
  deleteJob,
  updateJob,
  updateJobStatus,
  applyJob,
  addJob,
} = require("../controller/jobs.controller");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

/** get jobs by user id */
router.get("/:userId", (req, res) => {
  getAllJobs(req, res);
});

router.post("/:userId", (req, res) => {
  addJob(req, res);
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

router.post("/apply", upload.single("file"), (req, res) => {
  applyJob(req, res);
});
module.exports = router;
