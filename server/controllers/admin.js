const Admin = require("../models/admin.js");
const jwt = require("jsonwebtoken");
const bcryt = require("bcryptjs");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const admin = await Admin.findOne({ userName });

    if (!admin) return res.status(400).json({ message: "Invaid User Name" });

    const isPasswordMatched = await bcryt.compare(password, admin.password);
    if (!isPasswordMatched)
      return res.status(400).json({ message: "password don't matched" });

    const token = jwt.sign(
      { id: admin._id, userName: admin.userName },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );

    res.status(200).json({
      admin: admin.userName,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const register = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ userName });
    if (existingAdmin) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcryt.hash(password, 10);

    // Create a new admin with the hashed password
    const newAdmin = new Admin({
      userName,
      password: hashedPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { login, register };
