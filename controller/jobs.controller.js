const { Job } = require("../models/job.model");
const { Platform } = require("../models/platform.model");
const Joi = require("joi");
const { User } = require("../models/user.model");

const storeJobs = async (jobs, userId, platform) => {
  try {
    const wantedPlatform = await Platform.findOne({ name: platform });
    const user = await User.findById(userId);

    for (let job of jobs) {
      const found = await Job.findOne({ key: job.key });
      if (!found) {
        const storedJob = await createJob(job, wantedPlatform);
        user.jobs.push(storedJob._id);
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
// const jobSchema = Joi.object({
//   Key: Joi.string(),
//   title: Joi.string().min(3).required(),
//   company: Joi.string().min(3),
//   mode: Joi.string().min(3),
//   location: Joi.string().min(3),
//   link: Joi.string().min(10),
// });

module.exports = {
  storeJobs,
};
