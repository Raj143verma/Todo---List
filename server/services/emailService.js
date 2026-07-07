const { getTransporter, fromName, fromAddress } = require('../utils/emailConfig');
const {
  getWelcomeTemplate,
  getPasswordResetTemplate,
  getEmailVerificationTemplate,
  getTaskReminderTemplate,
} = require('../templates/emailTemplates');

// Simple in-memory tracker for rate limiting
// Key: "email:type" -> Value: { lastSentAt: timestamp, attemptsPerHour: [timestamps], attemptsPerDay: [timestamps] }
const emailCooldowns = new Map();

/**
 * Checks if the request to send an email violates rate limits.
 * - Min 1 minute between consecutive emails of the same type.
 * - Max 3 attempts per hour for the same type.
 * - Max 10 password-reset requests per day.
 * @param {string} email Target recipient email
 * @param {string} type Email type identifier
 * @returns {boolean} True if rate limited, False if allowed
 */
const isRateLimited = (email, type) => {
  const now = Date.now();
  const key = `${email}:${type}`;
  let record = emailCooldowns.get(key);

  if (!record) {
    record = {
      lastSentAt: 0,
      attemptsPerHour: [],
      attemptsPerDay: [],
    };
    emailCooldowns.set(key, record);
  }

  // Filter out attempts older than their respective time frames
  record.attemptsPerHour = record.attemptsPerHour.filter(time => now - time < 60 * 60 * 1000);
  record.attemptsPerDay = record.attemptsPerDay.filter(time => now - time < 24 * 60 * 60 * 1000);

  // 1. Min 1 minute cooldown
  if (now - record.lastSentAt < 60 * 1000) {
    console.warn(`⚠️ [Email Rate Limit] Cooldown active for ${email} (Type: ${type}). Must wait at least 1 minute.`);
    return true;
  }

  // 2. Max 3 email attempts per hour
  if (record.attemptsPerHour.length >= 3) {
    console.warn(`⚠️ [Email Rate Limit] Hourly limit exceeded for ${email} (Type: ${type}). Maximum is 3/hour.`);
    return true;
  }

  // 3. Max 10 password resets per day
  if (type === 'password-reset' && record.attemptsPerDay.length >= 10) {
    console.warn(`⚠️ [Email Rate Limit] Daily limit exceeded for password reset requests for ${email}. Maximum is 10/day.`);
    return true;
  }

  // Approve and log attempt
  record.lastSentAt = now;
  record.attemptsPerHour.push(now);
  record.attemptsPerDay.push(now);
  return false;
};

/**
 * Internal helper to send emails via the Nodemailer transporter.
 * If credentials are missing or misconfigured, it logs the email content to console and returns false.
 * @param {string} to Recipient email
 * @param {string} subject Email subject line
 * @param {string} htmlContent HTML body content
 * @param {string} type Email type (e.g. 'welcome', 'password-reset', 'verification', 'reminder')
 * @returns {Promise<boolean>} True if sent successfully, False otherwise
 */
const sendMailHelper = async (to, subject, htmlContent, type) => {
  // Validate email format
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!to || !emailRegex.test(to)) {
    console.error(`❌ Email failed: Invalid recipient address "${to}"`);
    return false;
  }

  // Enforce rate limits
  if (isRateLimited(to, type)) {
    return false;
  }

  const transporter = getTransporter();

  if (!transporter) {
    console.warn(`⚠️ [Email Service] Transporter not initialized. Printing email to console:`);
    console.log(`[CONSOLE EMAIL FALLBACK]`);
    console.log(`  To: ${to}`);
    console.log(`  From: "${fromName}" <${fromAddress}>`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Type: ${type}`);
    console.log(`  Body preview (length ${htmlContent.length} chars)`);
    console.log(`=========================================`);
    return false;
  }

  try {
    const mailOptions = {
      from: `"${fromName}" <${fromAddress}>`,
      to,
      subject,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${to} (Type: ${type}). MessageId: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error(`❌ Email failed for ${to} (Type: ${type}):`, error);
    return false;
  }
};

/**
 * Sends a welcome email when a user creates an account.
 * @param {string} email User's email address
 * @param {string} name User's full name
 * @returns {Promise<boolean>}
 */
const sendWelcomeEmail = async (email, name) => {
  const getStartedUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  const htmlContent = getWelcomeTemplate(name, getStartedUrl);
  return sendMailHelper(email, '🎉 Welcome to Todo SaaS!', htmlContent, 'welcome');
};

/**
 * Sends a password reset email containing a reset link.
 * @param {string} email User's email address
 * @param {string} resetLink Fully-formed password reset URL
 * @returns {Promise<boolean>}
 */
const sendPasswordResetEmail = async (email, resetLink) => {
  const htmlContent = getPasswordResetTemplate(resetLink);
  return sendMailHelper(email, '🔐 Reset Your Password', htmlContent, 'password-reset');
};

/**
 * Sends an email verification link.
 * @param {string} email User's email address
 * @param {string} verificationLink Verification link URL
 * @returns {Promise<boolean>}
 */
const sendEmailVerification = async (email, verificationLink) => {
  const htmlContent = getEmailVerificationTemplate(verificationLink);
  return sendMailHelper(email, '✉️ Verify Your Email', htmlContent, 'verification');
};

/**
 * Sends daily or weekly task reminders.
 * @param {string} email User's email address
 * @param {Array} tasks List of pending tasks
 * @param {object} [stats] Optional task execution metrics (e.g. { total, completedPercent })
 * @returns {Promise<boolean>}
 */
const sendTaskReminder = async (email, tasks, stats = {}) => {
  const htmlContent = getTaskReminderTemplate(tasks, stats);
  return sendMailHelper(email, '📋 Your tasks for today', htmlContent, 'reminder');
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
  sendTaskReminder,
};
