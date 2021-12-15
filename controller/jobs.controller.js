const { Job } = require("../models/job.model");
const { sendMail } = require("../services/mailService");
const { Platform } = require("../models/platform.model");
const { User } = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

const storeJobs = async (jobs, userId, platform) => {
  try {
    const wantedPlatform = await Platform.findOne({ name: platform });
    const user = await User.findById(userId);

    for (let job of jobs) {
      const found = await User.findOne({
        _id: user._id,
        jobs: { $elemMatch: { key: job.key } },
      });
      if (!found) {
        user.jobs.push(
          new Job({
            ...job,
            platform: { _id: wantedPlatform._id, name: wantedPlatform.name },
          })
        );
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

const addJob = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const job = new Job({
      key: uuidv4(),
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      notes: req.body.notes,
      link: req.body.link,
      mode: "On-site",
      applied: true,
      isRelevant: true,
      applyDate: new Date().toISOString().slice(0, 10),
      status: "CV Sent",
    });
    user.jobs.push(job);
    await user.save();

    res.status(201).send(job);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllJobs = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    const relevantJobs = user.jobs.filter((p) => p.isRelevant);
    res.status(200).send(relevantJobs);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteJob = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        jobs: { $elemMatch: { _id: req.body.jobId } },
      },
      {
        $set: {
          "jobs.$.isRelevant": false,
        },
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

/** updating "applied" and "applyDate" props of a given job */
const updateJob = async (req, res) => {
  try {
    const currentDate = new Date().toISOString().slice(0, 10);
    const user = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        jobs: { $elemMatch: { _id: req.body.jobId } },
      },
      {
        $set: {
          "jobs.$.applied": true,
          "jobs.$.applyDate": currentDate,
          "jobs.$.status": "CV Sent",
        },
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateJobStatus = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      {
        _id: req.body.userId,
        jobs: { $elemMatch: { _id: req.body.jobId } },
      },
      {
        $set: {
          "jobs.$.status": req.body.status,
        },
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

/** not working yet */
const applyJob = async (req, res) => {
  console.log("hello: ", req.file);
  sendMail({
    from: "omriza5@gmail.com",
    to: "omriza5@gmail.com",
    subject: req.body.subject,
    text: req.body.body,
    attachments: [
      {
        filename: "Back.jpg",
        path: "../uploads/Back.jpg",
        // contentType: "application/pdf",
      },
    ],
  });
};

module.exports = {
  storeJobs,
  getAllJobs,
  deleteJob,
  updateJob,
  updateJobStatus,
  applyJob,
  addJob,
};
