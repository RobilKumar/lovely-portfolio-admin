const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  Skills: {
    type: [{ key: String, value: Number }],
  },
});

module.exports = mongoose.model("Skill", skillSchema);
