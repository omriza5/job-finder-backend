const mongoose = require("mongoose");

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: "3",
    required: true,
  },
});

const Platform = mongoose.model("Platform", platformSchema);

module.exports = {
  Platform,
  platformSchema,
};
