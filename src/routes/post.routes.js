let express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authMiddleware = require("../middleware/auth.middleware");
let router = express.Router();

router.get(
  "/",
  authMiddleware,
  (req, res) => {
    return res.send("ok main insta ke andar aa gaya hu");
  },
);

module.exports = router;
