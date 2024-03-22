const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectname: {
    type: String,
    default: null,
  },
  technology: {
    type: String,
    default: null,
  },

  images: {
    type: String,
    default: null,
  },

  link: {
    type: String,
    default: null,
  },

  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    refer: "admin",
  },
});

module.exports = mongoose.model("project", projectSchema);
