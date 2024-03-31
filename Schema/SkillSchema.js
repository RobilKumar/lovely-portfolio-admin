const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  Skill: {
    type: String,
    default: "",
  },
  Value: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
