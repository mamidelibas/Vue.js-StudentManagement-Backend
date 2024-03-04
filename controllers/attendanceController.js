// controllers/attendanceController.js
const Attendance = require("../models/attendance");

exports.createOrUpdateAttendance = async (req, res) => {
  try {
    const { attendanceDate, classId, students } = req.body;
    const attendance = await Attendance.findOne({
      course: classId,
      date: attendanceDate,
    });
    if (attendance) {
      const newAttendance = await Attendance.findByIdAndUpdate(
        attendance._id,
        {
          students,
        },
        {
          new: true,
        }
      );
      return res.status(200).json(newAttendance);
    }
    const newAttendance = await Attendance.create({
      course: classId,
      date: attendanceDate,
      students,
    });
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendance = async (req, res) => {
  try {
    const { attendanceDate, classId } = req.body;
    const attendance = await Attendance.find({
      course: classId,
      date: attendanceDate,
    });
    if (attendance?.length === 0) {
      Attendance.create({
        course: classId,
        date: attendanceDate,
        students: [],
      });

      return res.status(200).json({
        course: classId,
        date: attendanceDate,
        students: [],
      });
    }
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
