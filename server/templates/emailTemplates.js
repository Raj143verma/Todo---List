/**
 * Wraps individual content HTML inside a master layout wrapper.
 * @param {string} title Email page title and header heading
 * @param {string} contentHTML Inner email HTML content
 * @returns {string} Fully styled HTML email string
 */
const wrapLayout = (title, contentHTML) => {
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed; background-color: #f1f5f9;">
    <tr>
      <td align="center" style="padding: 40px 10px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          <!-- Header (Brand Gradient) -->
          <tr>
            <td style="background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); padding: 40px 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.025em; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${title}</h1>
            </td>
          </tr>
          <!-- Body Content -->
          <tr>
            <td style="padding: 40px 30px; color: #334155; font-size: 16px; line-height: 1.6;">
              ${contentHTML}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px;">
              <p style="margin: 0 0 8px 0; font-weight: 700; color: #475569;">Todo SaaS</p>
              <p style="margin: 0 0 16px 0;">Build habits, complete tasks, and boost your daily workflow.</p>
              <div style="margin: 16px 0;">
                <a href="${clientUrl}" style="color: #6366F1; text-decoration: none; font-weight: 600; margin: 0 10px;">Go to App</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="${clientUrl}/unsubscribe" style="color: #64748b; text-decoration: none; margin: 0 10px;">Unsubscribe</a>
              </div>
              <p style="margin: 16px 0 0 0; font-size: 11px; color: #94a3b8;">&copy; ${new Date().getFullYear()} Todo SaaS. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

/**
 * Generates the HTML Welcome email content.
 * @param {string} name User's name
 * @param {string} getStartedUrl App entrypoint URL
 * @returns {string} Welcome email HTML
 */
const getWelcomeTemplate = (name, getStartedUrl) => {
  const content = `
    <p style="margin-top: 0; font-size: 18px; font-weight: 600; color: #1e293b;">Hi ${name},</p>
    <p style="margin-bottom: 24px;">Welcome to <strong>Todo SaaS</strong>! We are excited to help you manage your daily productivity and stay on top of your goals.</p>
    
    <div style="background-color: #f8fafc; border-left: 4px solid #6366F1; padding: 20px; border-radius: 0 8px 8px 0; margin-bottom: 28px;">
      <h3 style="margin: 0 0 12px 0; color: #4f46e5; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">🚀 Features you will love:</h3>
      <ul style="margin: 0; padding-left: 20px; color: #475569; font-size: 15px; line-height: 1.7;">
        <li style="margin-bottom: 8px;"><strong>✨ Smart AI Tasks:</strong> Auto-generate structured steps for any goal.</li>
        <li style="margin-bottom: 8px;"><strong>⏱️ Pomodoro Timer:</strong> Work in timed intervals with built-in statistics.</li>
        <li style="margin-bottom: 8px;"><strong>📅 Calendar View:</strong> Visualize task deadlines and stay ahead.</li>
        <li style="margin-bottom: 0;"><strong>🔥 Habit Streaks:</strong> Track active days and build strong routines.</li>
      </ul>
    </div>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${getStartedUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">Get Started Now</a>
        </td>
      </tr>
    </table>

    <p style="margin-bottom: 0; font-size: 15px; color: #64748b;">If you need assistance or have any suggestions, simply reply to this email. We're here for you!</p>
  `;
  return wrapLayout('🎉 Welcome to Todo SaaS!', content);
};

/**
 * Generates the HTML Password Reset email content.
 * @param {string} resetUrl Password reset page link
 * @returns {string} Reset password email HTML
 */
const getPasswordResetTemplate = (resetUrl) => {
  const content = `
    <p style="margin-top: 0; font-size: 18px; font-weight: 600; color: #1e293b;">Hello,</p>
    <p style="margin-bottom: 24px;">We received a request to reset the password for your Todo SaaS account. Please click the button below to set a new password.</p>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${resetUrl}" style="display: inline-block; background-color: #f59e0b; color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(245, 158, 11, 0.2);">Reset Password</a>
        </td>
      </tr>
    </table>

    <div style="background-color: #fffbeb; border: 1px solid #fef3c7; padding: 16px; border-radius: 8px; margin-bottom: 24px; color: #b45309; font-size: 14px; line-height: 1.5;">
      <p style="margin: 0 0 6px 0; font-weight: 700;">🔒 Security Notice:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li style="margin-bottom: 4px;">This password reset link will expire in <strong>1 hour</strong>.</li>
        <li>If you did not request a password reset, you can safely ignore this email. Your account remains secure.</li>
      </ul>
    </div>
  `;
  return wrapLayout('🔐 Reset Your Password', content);
};

/**
 * Generates the HTML Email Verification content.
 * @param {string} verificationUrl Email verification link
 * @returns {string} Verification email HTML
 */
const getEmailVerificationTemplate = (verificationUrl) => {
  const content = `
    <p style="margin-top: 0; font-size: 18px; font-weight: 600; color: #1e293b;">Hello,</p>
    <p style="margin-bottom: 24px;">Thank you for registering at Todo SaaS! To complete your signup and verify your email address, please click the link below.</p>
    
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
      <tr>
        <td align="center">
          <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">Verify Email Address</a>
        </td>
      </tr>
    </table>

    <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">This email verification link will expire in <strong>24 hours</strong>. If you did not register for this account, you can safely disregard this email.</p>
  `;
  return wrapLayout('✉️ Verify Your Email', content);
};

/**
 * Generates the HTML Task Reminder content.
 * @param {Array} tasks Array of tasks (each with title, priority, dueDate, category)
 * @param {object} stats Object containing summary metrics (total, completedPercent)
 * @returns {string} Task reminder email HTML
 */
const getTaskReminderTemplate = (tasks, stats = {}) => {
  const totalCount = stats.total || (tasks ? tasks.length : 0);
  const completedPercent = stats.completedPercent || 0;
  
  let tasksHTML = '';
  if (!tasks || tasks.length === 0) {
    tasksHTML = `
      <tr>
        <td colspan="3" style="text-align: center; padding: 30px; color: #64748b; font-style: italic; font-size: 15px;">
          🎉 No pending tasks! You are all caught up.
        </td>
      </tr>
    `;
  } else {
    tasks.forEach(task => {
      let priorityColor = '#10b981'; // Default green (low)
      let priorityText = 'Low';
      
      const p = String(task.priority || 'low').toLowerCase();
      if (p === 'high' || p === '3' || task.priority === 3) {
        priorityColor = '#ef4444'; // Red
        priorityText = 'High';
      } else if (p === 'medium' || p === '2' || task.priority === 2) {
        priorityColor = '#f59e0b'; // Amber
        priorityText = 'Medium';
      }
      
      let formattedDate = 'No Deadline';
      if (task.dueDate) {
        try {
          formattedDate = new Date(task.dueDate).toLocaleDateString(undefined, { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric' 
          });
        } catch (e) {
          formattedDate = String(task.dueDate);
        }
      }

      tasksHTML += `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 14px 10px; color: #334155; font-size: 15px; font-weight: 500;">
            ${task.title}
            ${task.category ? `<br><span style="font-size: 12px; color: #94a3b8; font-weight: normal;">${task.category}</span>` : ''}
          </td>
          <td style="padding: 14px 10px;">
            <span style="display: inline-block; background-color: ${priorityColor}15; color: ${priorityColor}; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;">
              ${priorityText}
            </span>
          </td>
          <td style="padding: 14px 10px; color: #64748b; font-size: 14px; text-align: right; white-space: nowrap;">
            ${formattedDate}
          </td>
        </tr>
      `;
    });
  }

  const content = `
    <p style="margin-top: 0; font-size: 18px; font-weight: 600; color: #1e293b;">Hello,</p>
    <p style="margin-bottom: 20px;">Here is your personal digest of pending tasks. Make today productive!</p>
    
    <!-- Stats Bar -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-radius: 12px; margin-bottom: 24px; padding: 16px;">
      <tr>
        <td style="text-align: center; width: 50%; border-right: 1px solid #e2e8f0;">
          <span style="display: block; font-size: 24px; font-weight: 700; color: #6366F1;">${totalCount}</span>
          <span style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Pending Tasks</span>
        </td>
        <td style="text-align: center; width: 50%;">
          <span style="display: block; font-size: 24px; font-weight: 700; color: #10b981;">${completedPercent}%</span>
          <span style="font-size: 11px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">Completion Rate</span>
        </td>
      </tr>
    </table>

    <h3 style="color: #1e293b; font-size: 15px; font-weight: 700; margin: 0 0 12px 0; text-transform: uppercase; letter-spacing: 0.05em;">📋 Task Summary</h3>
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 28px;">
      <thead>
        <tr style="border-bottom: 2px solid #e2e8f0; text-align: left; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">
          <th style="padding: 8px 10px;">Task Title</th>
          <th style="padding: 8px 10px; width: 90px;">Priority</th>
          <th style="padding: 8px 10px; text-align: right; width: 110px;">Due Date</th>
        </tr>
      </thead>
      <tbody>
        ${tasksHTML}
      </tbody>
    </table>

    <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
        <td align="center">
          <a href="${process.env.CLIENT_URL || 'http://localhost:5173'}/todos" style="display: inline-block; background: linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%); color: #ffffff; text-decoration: none; padding: 13px 28px; font-size: 15px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 6px rgba(99, 102, 241, 0.2);">Open Workspace</a>
        </td>
      </tr>
    </table>
  `;
  return wrapLayout('📋 Your Task Digest', content);
};

module.exports = {
  getWelcomeTemplate,
  getPasswordResetTemplate,
  getEmailVerificationTemplate,
  getTaskReminderTemplate,
};
