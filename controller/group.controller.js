const { Group } = require("../models/group.model");

const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).send(groups);
  } catch (error) {}
};

module.exports = {
  getGroups,
};
