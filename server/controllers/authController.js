const crypto = require('crypto');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
} = require('../services/emailService');

// Helper to update streak
const handleStreak = (user) => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  if (!user.lastActive) {
    user.streak = 1;
    user.lastActive = now;
    return;
  }

  const lastActiveDate = new Date(user.lastActive);
  const lastActiveDay = new Date(
    lastActiveDate.getFullYear(),
    lastActiveDate.getMonth(),
    lastActiveDate.getDate()
  );

  const diffTime = today - lastActiveDay;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) {
    user.streak += 1;
  } else if (diffDays > 1) {
    user.streak = 1;
  }
  // If diffDays === 0, user is active today and streak stays same
  
  user.lastActive = now;
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
      name,
      email,
      password,
      streak: 1,
      lastActive: new Date(),
      verificationToken,
      verificationTokenExpires,
    });

    if (user) {
      const clientBaseUrl = (process.env.CLIENT_URL || process.env.FRONTEND_URL || '').replace(/\/$/, '');
      const verificationLink = clientBaseUrl
        ? `${clientBaseUrl}/verify-email?token=${verificationToken}`
        : `/verify-email?token=${verificationToken}`;

      // Dispatch welcome and verification emails in background without blocking the HTTP response
      Promise.all([
        sendWelcomeEmail(user.email, user.name),
        sendEmailVerification(user.email, verificationLink),
      ]).catch((emailErr) => {
        console.error('Non-blocking registration email error:', emailErr);
      });

      res.status(201).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        streak: user.streak,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      handleStreak(user);
      await user.save();

      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        streak: user.streak,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      handleStreak(user);
      await user.save();

      res.json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        streak: user.streak,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logoutUser = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    next(error);
  }
};

// @desc    Request password reset token
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400);
      throw new Error('Please provide an email address');
    }

    const user = await User.findOne({ email });

    // For security reasons, don't confirm or deny if email exists in database.
    // Just return success message, but only send email if user exists.
    if (!user) {
      return res.status(200).json({
        success: true,
        message: 'If that email address exists in our system, we have sent a password reset link to it.',
      });
    }

    // Generate reset token (secure random hex string)
    const resetToken = crypto.randomBytes(32).toString('hex');
    
    // Hash token using sha256 and set in user schema
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Token expires in 1 hour
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;

    await user.save();

    const clientBaseUrl = (process.env.CLIENT_URL || process.env.FRONTEND_URL || '').replace(/\/$/, '');
    const resetLink = clientBaseUrl
      ? `${clientBaseUrl}/reset-password?token=${resetToken}`
      : `/reset-password?token=${resetToken}`;
    
    // Log the request
    console.log(`🔑 Password reset requested for: ${email}`);
    
    const emailSent = await sendPasswordResetEmail(user.email, resetLink);

    if (!emailSent) {
      // Clear token fields if send fails
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();
      
      res.status(500);
      throw new Error('Failed to send password reset email. Please try again later.');
    }

    res.status(200).json({
      success: true,
      message: 'If that email address exists in our system, we have sent a password reset link to it.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password using reset token
// @route   POST /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;
    if (!token || !password) {
      res.status(400);
      throw new Error('Please provide both the token and the new password');
    }

    // Hash the incoming token to match stored token
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Find user with matching token and unexpired reset time
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error('Password reset token is invalid or has expired');
    }

    // Set new password (the model's pre-save hook will hash it)
    user.password = password;
    
    // Clear reset token fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    
    await user.save();

    console.log(`🔒 Password successfully reset for user ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify user email address
// @route   POST /api/auth/verify-email
// @access  Public
const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      res.status(400);
      throw new Error('Please provide verification token');
    }

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error('Email verification token is invalid or has expired');
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    
    await user.save();

    console.log(`✉️ Email successfully verified for user ${user.email}`);

    res.status(200).json({
      success: true,
      message: 'Email verified successfully. Your account is now active.',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
