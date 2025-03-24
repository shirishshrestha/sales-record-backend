import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role: "user",
    }); // New users are 'user'
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res
      .status(200)
      .json({
        message: "Login successful",
        token,
        username: user.username,
        role: user.role,
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
