const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

let authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Token not found",
      });
    }

    let decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    let user = await userModel.findById(decode.id);

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authentication failed",
      error,
    });
  }
};

module.exports = authMiddleware;