const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


if (!authController || !authController.signup || !authController.login) {
  console.error("authController is not properly imported");
} else {
  console.log("authController loaded successfully");
}


router.post('/signup', authController.signup);
router.post('/login', authController.login);

module.exports = router;
