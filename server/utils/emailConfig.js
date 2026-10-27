const nodemailer = require('nodemailer');

/**
 * Validates the email configuration environment variables.
 * Logs warnings if variables are missing but doesn't crash the application.
 * @returns {boolean} true if config is complete, false otherwise
 */
const validateConfig = () => {
  const service = (process.env.EMAIL_SERVICE || 'gmail').toLowerCase();
  const warnings = [];

  if (service === 'gmail') {
    if (!process.env.EMAIL_USER) {
      warnings.push('EMAIL_USER is not set in environment variables.');
    }
    if (!process.env.EMAIL_PASSWORD) {
      warnings.push('EMAIL_PASSWORD (app password) is not set in environment variables.');
    }
  } else if (service === 'sendgrid') {
    if (!process.env.SENDGRID_API_KEY) {
      warnings.push('SENDGRID_API_KEY is not set in environment variables.');
    }
  } else if (service === 'smtp') {
    if (!process.env.SMTP_HOST) warnings.push('SMTP_HOST is not set.');
    if (!process.env.SMTP_PORT) warnings.push('SMTP_PORT is not set.');
    if (!process.env.SMTP_USER) warnings.push('SMTP_USER is not set.');
    if (!process.env.SMTP_PASS) warnings.push('SMTP_PASS is not set.');
  } else {
    warnings.push(`EMAIL_SERVICE is set to "${service}", which is not a recognized provider.`);
  }

  if (warnings.length > 0) {
    console.warn('⚠️ [Email Config Warning] Email service configuration is incomplete:\n  - ' + warnings.join('\n  - '));
    return false;
  }
  return true;
};

/**
 * Creates and returns a Nodemailer transporter based on current configurations.
 * Returns null if the configuration is invalid or missing.
 * @returns {object|null} Nodemailer transporter instance or null
 */
const getTransporter = () => {
  const service = (process.env.EMAIL_SERVICE || 'gmail').toLowerCase();
  let config = {};

  if (service === 'gmail') {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('⚠️ [Email Config] Gmail credentials missing. Email sending will be disabled.');
      return null;
    }
    config = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
  } else if (service === 'sendgrid') {
    if (!process.env.SENDGRID_API_KEY) {
      console.warn('⚠️ [Email Config] SendGrid API Key missing. Email sending will be disabled.');
      return null;
    }
    config = {
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY,
      },
    };
  } else if (service === 'smtp') {
    if (!process.env.SMTP_HOST || !process.env.SMTP_PORT || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn('⚠️ [Email Config] SMTP server configuration details missing. Email sending will be disabled.');
      return null;
    }
    config = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT, 10) || 587,
      secure: process.env.SMTP_SECURE === 'true', // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    };
  } else {
    console.warn(`⚠️ [Email Config] Unsupported EMAIL_SERVICE value: "${service}". Email sending will be disabled.`);
    return null;
  }

  try {
    return nodemailer.createTransport({
      ...config,
      connectionTimeout: 8000, // 8s connection timeout
      greetingTimeout: 5000,   // 5s greeting timeout
      socketTimeout: 10000,    // 10s socket timeout
    });
  } catch (error) {
    console.error('❌ [Email Config Error] Failed to create nodemailer transporter:', error);
    return null;
  }
};

module.exports = {
  validateConfig,
  getTransporter,
  fromName: process.env.EMAIL_FROM_NAME || 'Todo SaaS',
  fromAddress: process.env.EMAIL_FROM_ADDRESS || 'noreply@todosaas.com',
  clientUrl: (process.env.CLIENT_URL || process.env.FRONTEND_URL || '').replace(/\/$/, '') || '/',
};
