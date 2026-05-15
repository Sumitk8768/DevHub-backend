const jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

const userModel = require("../models/user.model");

let registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({
        message: "All fields are required",
      });

    let isExisted = await userModel.findOne({ email });

    if (isExisted)
      return res.status(409).json({
        message: "This email is already registered",
      });

    // Hash password
    let hashpass = await bcrypt.hash(password, 10);

    let newUser = await userModel.create({
      name,
      email,
      password: hashpass,
    });

    // Authorization - token banana hai

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User Created sucessfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

let loginController = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({
        message: "email and password are required",
      });

    let isExisted = await userModel.findOne({ email });

    if (!isExisted)
      return res.status(404).json({
        message: "User not found",
      });

    let comparePass = await bcrypt.compare(password, isExisted.password);

    if (!comparePass)
      return res.status(401).json({ message: "Invalid Credential" });

      let token = jwt.sign({ id: isExisted._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

     res.cookie("token", token);

    return res.status(200).json({
      message: "User Loggedin sucessfully",
      user: isExisted,
    });

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};
module.exports = {
  registerController,
  loginController,
};
