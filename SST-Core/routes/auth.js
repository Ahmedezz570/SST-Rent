const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/UsersSchema'); 
const Config = require('../models/ConfigSchema');

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login request:", req.body);
  try {
    const config = await Config.findOne();
   
    const user = await User.findOne({ email }); 
    
    if (config?.isLoginDisabledForUser && user.role !== 'admin'){
      return res.status(403).json({ message: "Login is currently disabled for users" });
    }
    if (!user) return res.status(400).json({ message: "User not found" });

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

   
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role , name : user.name },
      'your_secret_key',
      { expiresIn: '1d' }
    );

    
    res.status(200).json({
      message: "Login successful",
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token, 
        createdAt: user.createdAt,
        studentId: user.studentId,
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err });
  }
});

router.post("/checkLogin", async (req, res) => {
  try {
   const {disableLogin}= req.body;
   await Config.updateOne({}, { isLoginDisabledForUser: disableLogin });
    res.status(200).json({ message: "Login status updated successfully" });

  } catch (err) {
    console.error("Error updating login status:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
router.get("/getLoginStatus", async (req, res) => {
  try {
    const config = await Config.findOne();
    res.status(200).json({ isLoginDisabledForUser: config?.isLoginDisabledForUser });
  } catch (err) {
    res.status(500).json({ message: "Error fetching status", error: err.message });
  }
});

// register route
// router.post("/register", async (req, res) => {
//   const { username, email, password, department, role } = req.body;

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword,
//       department,
//       role, 
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Something went wrong", error: err });
//   }
// });


router.post("/register", async (req, res) => {
  const { name, email, password, role, studentId } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      studentId,
      createdAt: new Date().toISOString().split("T")[0],
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});


module.exports = router;
