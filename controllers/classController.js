// controllers/classController.js
const Instructor = require("../models/instructor");
const Student = require("../models/student");
const Class = require("../models/class");

exports.createClass = async (req, res) => {
  try {
    const { startDate, endDate, totalHours, instructor, students, courseName } =
      req.body;

    if (!startDate || !endDate || !totalHours || !courseName) {
      return res.status(400).json({ error: "Eksik alanları kontrol ediniz" });
    }

    if (instructor) {
      const instructorFound = await Instructor.findById(instructor);
      if (!instructorFound) {
        return res.status(400).json({ error: "Eğitmen bulunamadı" });
      }
    }

    if (students && students.length > 0) {
      const studentsFound = await Student.find({ _id: { $in: students } });
      if (studentsFound.length !== students.length) {
        return res.status(400).json({ error: "Öğrenci bulunamadı" });
      }
    }

    const classCreated = await Class.create({
      startDate,
      endDate,
      totalHours,
      instructor: instructor || null,
      students: students || [],
      courseName,
    });

    if (instructor) {
      Instructor.findByIdAndUpdate(
        instructor,
        { $push: { courses: classCreated._id } },
        { new: true }
      ).exec();
    }

    if (students) {
      Student.updateMany(
        { _id: { $in: students } },
        { $push: { courses: classCreated._id } }
      ).exec();
    }

    res.status(201).json(classCreated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateClass = async (req, res) => {
  try {
    const classUpdated = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!classUpdated) {
      return res.status(400).json({ error: "Sınıf bulunamadı" });
    }

    if (classUpdated.instructor) {
      const instructorFound = await Instructor.findById(
        classUpdated.instructor
      );
      if (!instructorFound) {
        return res.status(400).json({ error: "Eğitmen bulunamadı" });
      }

      Instructor.findByIdAndUpdate(
        classUpdated.instructor,
        { $push: { courses: classUpdated._id } },
        { new: true }
      ).exec();
    }

    if (classUpdated.students) {
      const studentsFound = await Student.find({
        _id: { $in: classUpdated.students },
      });
      if (studentsFound.length !== classUpdated.students.length) {
        return res.status(400).json({ error: "Öğrenci bulunamadı" });
      }

      Student.updateMany(
        { _id: { $in: classUpdated.students } },
        { $push: { courses: classUpdated._id } }
      ).exec();
    }

    res.status(200).json(classUpdated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const classFound = await Class.findById(req.params.id);
    if (!classFound) {
      return res.status(400).json({ error: "Sınıf bulunamadı" });
    }
    await Class.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: `${classFound.courseName} isimli sınıf silindi`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("instructor")
      .populate("students");
    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getClassById = async (req, res) => {
  try {
    const classFound = await Class.findById(req.params.id)
      .populate("instructor")
      .populate("students");
    res.status(200).json(classFound);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStudentsByClassId = async (req, res) => {
  try {
    const classFound = await Class.findById(req.params.id).populate("students");
    if (!classFound) {
      return res.status(400).json({ error: "Sınıf bulunamadı" });
    }
    res.status(200).json(classFound.students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
