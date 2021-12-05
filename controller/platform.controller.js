const { Platform } = require("../models/platform.model");
const Joi = require("joi");

const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find();
    res.status(200).send(platforms);
  } catch (error) {
    res.status(400).send(error);
  }
};

const createPlatform = async (req, res) => {
  const { error } = platformSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).send(errorMessage);
  }

  try {
    const platform = new Platform({
      name: req.body.name,
    });
    await platform.save();
    res.status(201).send(platform);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const platformSchema = Joi.object({
  name: Joi.string().min(3).required(),
});
module.exports = {
  getPlatforms,
  createPlatform,
};
