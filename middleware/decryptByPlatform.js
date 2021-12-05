const bcrypt = require("bcrypt");
const { User } = require("../models/user.model");

const decryptByPlatform = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const username =
    req.body.platform === "linkedin"
      ? user.linkedinUsername
      : user.facebookUsername;
  let password =
    req.body.platform === "linkedin"
      ? user.linkedinPassword
      : user.facebookPassword;

  const validPassword = await bcrypt.compare(req.body.platformPass, password);

  if (!validPassword) {
    return res.status(400).send(`Invalid ${req.body.platform} password`);
  }

  req.user.username = username;
  req.user.password = req.body.platformPass;
  next();
};

module.exports = decryptByPlatform;
