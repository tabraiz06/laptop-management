const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Employee = require("../models/Employee");

// Sign Up
const Register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ name, email, password: hashedPassword, isAdmin });
  await user.save();

  const token = jwt.sign({ _id: user._id }, "SECRET_KEY");
  res.status(201).json({ token,user });
};

// Login
const Login = async (req, res) => {
  const { email, password } = req.body;
  const user =
    (await User.findOne({ email })) || (await Employee.findOne({ email }));

  if (!user) return res.status(400).send("Email not found");

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ _id: user._id }, "SECRET_KEY");
  res.status(200).json({ token,user });
};

module.exports = { Register, Login };
