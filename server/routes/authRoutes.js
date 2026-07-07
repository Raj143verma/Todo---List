const express = require('express');
const router = express.Router();
const {
  registerUser,
  authUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validate');

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, authUser);
router.get('/me', protect, getUserProfile);
router.post('/logout', protect, logoutUser);

// Email notification system routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/verify-email', verifyEmail);

module.exports = router;
