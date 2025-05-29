// routes/userRoutes.js
const express = require("express");
const bcrypt = require('bcrypt');
const User = require("../models/UsersSchema"); 
const router = express.Router();

// Create a new user
router.post("/users", async (req, res) => {
  const { name, email, password, role, studentId } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); 
  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword, 
      role,
      studentId,
    });
    
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
});

// Update a user
router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role, studentId } = req.body;
  
  try {
    const updatedUser = await User.findByIdAndUpdate(id, {
      name,
      email,
      password,
      role,
      studentId,
    }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a user
router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try { 
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
