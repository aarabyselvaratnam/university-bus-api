const express = require("express");
const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

// Register Admin
router.post("/register", register);

// Login Admin
router.post("/login", login);

module.exports = router;