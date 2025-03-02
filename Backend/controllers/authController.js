const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const userId = await User.createUser(name, email, password);
    const token = generateToken({ id: userId, email });

    res.status(201).json({ token, user: { id: userId, name, email } });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findUserByEmail(email);
    if (!user) {
      console.error("❌ Login failed: User not found.");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // ✅ Debugging: Check stored password vs input password
    console.log("🔑 Stored Password (hashed):", user.password);
    console.log("🔑 Entered Password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.error("❌ Login failed: Incorrect password.");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: 'Server error. Please try again.' });
  }
};

module.exports = { signup, login };
