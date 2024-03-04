// controllers/studentController.js
const Student = require("../models/student");
const Class = require("../models/class");

exports.createStudent = async (req, res) => {
  try {
    const { name, lastName, mail, phoneNumber, courses } = req.body;

    if (!name || !lastName || !mail || !phoneNumber || !courses) {
      return res.status(400).json({ error: "Eksik alanları kontrol ediniz" });
    }

    const coursesFound = await Class.find({ _id: { $in: courses } });
    if (coursesFound.length !== courses.length) {
      return res.status(400).json({ error: "Kurs bulunamadı" });
    }

    const student = await Student.create({
      name,
      lastName,
      mail,
      phoneNumber,
      courses: coursesFound,
    });

    Class.updateMany(
      { _id: { $in: courses } },
      { $push: { students: student._id } }
    ).exec();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(400).json({ error: "Öğrenci bulunamadı" });
    }

    const coursesFound = await Class.find({ _id: { $in: student.courses } });
    if (coursesFound.length !== student.courses.length) {
      return res.status(400).json({ error: "Kurs bulunamadı" });
    }

    Class.updateMany(
      { _id: { $in: student.courses } },
      { $pull: { students: student._id } }
    ).exec();

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    const classes = await Class.find({ students: req.params.id });
    await Class.updateMany(
      { _id: { $in: classes } },
      { $pull: { students: req.params.id } }
    );
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ _id: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
