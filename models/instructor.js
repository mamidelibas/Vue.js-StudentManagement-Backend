const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: String,
  lastName: String,
  phoneNumber: String,
  mail: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
});

module.exports = mongoose.model("Instructor", instructorSchema);
