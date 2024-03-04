const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  courseName: String,
  startDate: Date,
  endDate: Date,
  totalHours: Number,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "Instructor" },
});

module.exports = mongoose.model("Class", classSchema);
