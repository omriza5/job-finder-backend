const { Job } = require("../models/job.model");
const { Platform } = require("../models/platform.model");
const { User } = require("../models/user.model");

const storeJobs = async (jobs, userId, platform) => {
  try {
    const wantedPlatform = await Platform.findOne({ name: platform });
    const user = await User.findById(userId);
    {
    }
    for (let job of jobs) {
      const found = await User.findOne({
        _id: user._id,
        jobs: { $elemMatch: { key: job.key } },
      });
      if (!found) {
        const storedJob = await createJob(job, wantedPlatform);
        user.jobs.push(storedJob);
      }
    }

    return await user.save();
  } catch (error) {
    console.log(error);
    return false;
  }
};

const createJob = async (job, platform) => {
  const newJob = new Job({
    ...job,
    platform: { _id: platform._id, name: platform.name },
  });
  return await newJob.save();
};

const getAllJobs = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);

    res.status(200).send(user.jobs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    user.jobs = user.jobs.filter(
      (job) => job._id.toString() !== req.body.jobId
    );
    await user.save();
    res.status(200).send(user.jobs);
  } catch (error) {}
};

module.exports = {
  storeJobs,
  getAllJobs,
  deleteJob,
};
