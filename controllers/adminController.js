const Admin = require("../models/admin");

exports.createAdmin = async (req, res) => {
  try {
    const { name, lastName, mail, phoneNumber, password, role } = req.body;

    if (!name || !lastName || !mail || !phoneNumber || !password || !role) {
      return res.status(400).json({ error: "Eksik alanları kontrol ediniz" });
    }

    const newAdmin = await Admin.create({
      name,
      lastName,
      mail,
      phoneNumber,
      password,
      role,
    });

    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const adminDeleted = await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json(adminDeleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();

    res.status(200).json({
      admins: admins.map((admin) => {
        return {
          _id: admin._id,
          name: admin.name,
          lastName: admin.lastName,
          mail: admin.mail,
          phoneNumber: admin.phoneNumber,
          role: admin.role,
        };
      }),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { mail, password } = req.body;

    if (!mail || !password) {
      return res.status(400).json({ error: "Eksik alanları kontrol ediniz" });
    }

    const admin = await Admin.findOne({ mail });

    if (!admin) {
      return res.status(400).json({ error: "Admin bulunamadı" });
    }

    if (admin.password !== password) {
      return res.status(400).json({ error: "Hatalı şifre" });
    }

    res.status(200).json({
      status: "success",
      data: {
        _id: admin._id,
        mail: admin.mail,
        name: admin.name,
        lastName: admin.lastName,
        phoneNumber: admin.phoneNumber,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
