const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// ✅ Check if authController functions exist
if (!authController || !authController.signup || !authController.login) {
  console.error("❌ authController is not properly imported.");
} else {
  console.log("✅ authController loaded successfully.");
}

// Define routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
