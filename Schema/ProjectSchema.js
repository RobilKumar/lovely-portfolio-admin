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

  imagePath: {
    type: String, // Store image data as binary data
    required: true,
  },
  // contentType: {
  //   type: String, // Specify the content type (e.g., image/jpeg, image/png)
  //   required: true
  // },

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
