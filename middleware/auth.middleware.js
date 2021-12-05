const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.JOB_FINDER_PRIVATE_KEY;
const auth = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) return res.status(401).send("Access denied. No token provided");

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;

    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = auth;
