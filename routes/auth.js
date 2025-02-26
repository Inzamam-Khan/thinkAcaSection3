const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Dummy in-memory store for users (you can use a DB in production)
const users = [];

// User Signup
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Store user
  users.push({ username, password: hashedPassword });

  res.status(201).json({ message: "User created successfully" });
});

// User Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username);
  
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

  res.json({ token });
});

module.exports = router;
