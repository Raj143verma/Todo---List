// Load environment variables from server/.env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { validateConfig } = require('../utils/emailConfig');
const {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendEmailVerification,
  sendTaskReminder,
} = require('../services/emailService');

console.log('⚡ Starting Email Service Test Sandbox...\n');

// 1. Validate Configurations
console.log('🔍 Validating Outbound Mail Config:');
const configIsValid = validateConfig();
console.log(`Config Validation Status: ${configIsValid ? 'PASSED ✅' : 'FAILED ⚠️ (Transporter falling back to console log)'}\n`);

// 2. Define test runner
const runTests = async () => {
  const testEmail = 'test@example.com';
  
  console.log('--------------------------------------------------');
  console.log(`📨 [Test 1] Dispatching Welcome Email to: ${testEmail}`);
  const welcomeResult = await sendWelcomeEmail(testEmail, 'Developer Tester');
  console.log(`Result: ${welcomeResult ? 'SENT ✅' : 'CONSOLE FALLBACK/BLOCKED ❌'}`);

  console.log('--------------------------------------------------');
  console.log(`📨 [Test 2] Dispatching Password Reset Email to: ${testEmail}`);
  const resetLink = `${process.env.CLIENT_URL || process.env.FRONTEND_URL || '/'}reset-password?token=test_reset_token_987654`;
  const resetResult = await sendPasswordResetEmail(testEmail, resetLink);
  console.log(`Result: ${resetResult ? 'SENT ✅' : 'CONSOLE FALLBACK/BLOCKED ❌'}`);

  console.log('--------------------------------------------------');
  console.log(`📨 [Test 3] Dispatching Email Verification to: ${testEmail}`);
  const verificationLink = `${process.env.CLIENT_URL || process.env.FRONTEND_URL || '/'}verify-email?token=test_verification_token_123456`;
  const verificationResult = await sendEmailVerification(testEmail, verificationLink);
  console.log(`Result: ${verificationResult ? 'SENT ✅' : 'CONSOLE FALLBACK/BLOCKED ❌'}`);

  console.log('--------------------------------------------------');
  console.log(`📨 [Test 4] Dispatching Daily Task Reminders to: ${testEmail}`);
  const mockTasks = [
    { title: 'Implement nodemailer service', priority: 'high', dueDate: new Date(), category: 'Coding' },
    { title: 'Update User DB schemas', priority: 'medium', dueDate: new Date(Date.now() + 86400000), category: 'Database' },
    { title: 'Read project documentation', priority: 'low', dueDate: null, category: 'Research' }
  ];
  const stats = { total: 3, completedPercent: 66 };
  const reminderResult = await sendTaskReminder(testEmail, mockTasks, stats);
  console.log(`Result: ${reminderResult ? 'SENT ✅' : 'CONSOLE FALLBACK/BLOCKED ❌'}`);

  console.log('--------------------------------------------------');
  
  // 3. Test Cooldown Rate Limiting (should trigger rate limit block because Welcome Email was sent just above)
  console.log('\n🔒 [Test 5] Verifying Cooldown Rate Limiting (Rapid Welcome Email attempt):');
  const duplicateResult = await sendWelcomeEmail(testEmail, 'Developer Tester Duplicate');
  console.log(`Result (Expected to be FALSE / Rate-limited): ${duplicateResult === false ? 'BLOCKED AS EXPECTED (SUCCESS) ✅' : 'SENT (FAILED - RATE LIMIT NOT WORKING) ❌'}`);
};

runTests().then(() => {
  console.log('\n🏁 Email service tests execution complete.');
});
