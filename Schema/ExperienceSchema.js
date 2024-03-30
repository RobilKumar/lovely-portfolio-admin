const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new Schema({
  CompanyName: {
    type: String,
    default: "",
  },
  Designation: {
    type: String,
    default: "",
  },
  Description: {
    type: String,
    default: "",
  },
  startDate: {
    type: Date,
    default: Date.now // Default value is set to the current date/time,
  },
  endDate: {
    type: Date,
    default: Date.now // Default value is set to the current date/time,
  },
});

module.exports = mongoose.model("Experience", ExperienceSchema);
