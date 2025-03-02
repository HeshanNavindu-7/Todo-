const db = require('../config/db');
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      console.error("❌ User not found:", email);
      return null;
    }
    console.log("✅ User found:", rows[0]); // Debug log
    return rows[0];
  } catch (err) {
    console.error("❌ Database Error (findUserByEmail):", err);
    throw err;
  }
};

const createUser = async (name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Hashed Password:", hashedPassword); // Debug log

    const [result] = await db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
    
    console.log("✅ User created with ID:", result.insertId); // Debug log
    return result.insertId;
  } catch (err) {
    console.error("❌ Database Error (createUser):", err);
    throw err;
  }
};

module.exports = { findUserByEmail, createUser };
