const Joi = require("joi");
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JOB_FINDER_PRIVATE_KEY;
const createUser = async (req, res) => {
  const { error } = userSchema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  /** check if user exists */
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send("User with the given email is already registered");
  }

  try {
    const hashedAppPass = await hashPassword(req.body.password);
    const hashedLinkedinPass = await hashPassword(req.body.linkedinPassword);
    const hashedFacebookPass = await hashPassword(req.body.facebookPassword);
    user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedAppPass,
      linkedinUsername: req.body.linkedinUsername,
      linkedinPassword: hashedLinkedinPass,
      facebookUsername: req.body.facebookUsername,
      facebookPassword: hashedFacebookPass,
    });
    user = await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      secret
    );

    res.status(201).send(token);
  } catch (error) {
    res.status(500).send("#createUser: Somthing went wrong!");
  }
};

/** helper function that takes a password and return a hashed one */
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    return hashed;
  } catch (error) {
    console.log(error);
  }
};

/** user schema for validation user request */
const userSchema = Joi.object({
  firstName: Joi.string().min(3).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email().min(8).required(),
  password: Joi.string().min(6).required(),
  linkedinUsername: Joi.string().min(6).required(),
  linkedinPassword: Joi.string().min(8).required(),
  facebookUsername: Joi.string().min(6).required(),
  facebookPassword: Joi.string().min(8).required(),
});
module.exports = {
  createUser,
};
