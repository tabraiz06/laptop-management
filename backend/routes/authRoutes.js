const express = require("express");

const { Register, Login } = require("../controllers/authController");

const router = express.Router();

// Sign Up
router.post("/signup", Register);

// Login
router.post("/login",Login );

module.exports = router;
