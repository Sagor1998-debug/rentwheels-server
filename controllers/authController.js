import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// ✅ Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, photoURL } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    if (!hasUppercase || !hasLowercase || password.length < 6) {
      return res.status(400).json({
        message:
          "Password must contain at least 1 uppercase, 1 lowercase, and be 6+ characters long.",
      });
    }

    // Do not hash here; User model handles it
    const user = new User({ name, email, password, photoURL });
    await user.save();

    res.status(201).json({
      message: "✅ User registered successfully",
      user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Registration failed", error: error.message });
  }
};

// ✅ Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      message: "✅ Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, photoURL: user.photoURL },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Login failed", error: error.message });
  }
};
