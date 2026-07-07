# Email Notifications System Setup Guide

This guide provides step-by-step instructions for configuring and testing the email service in the Todo SaaS application.

---

## Table of Contents
1. [Overview](#1-overview)
2. [Environment Configuration](#2-environment-configuration)
3. [Provider Configurations](#3-provider-configurations)
   - [Gmail (Development)](#option-a-gmail-for-development)
   - [SendGrid (Production)](#option-b-sendgrid-for-production)
   - [Mailtrap (Sandbox Testing)](#option-c-mailtrap-for-sandbox-testing)
4. [Integration Endpoints](#4-integration-endpoints)
5. [Testing & Verification](#5-testing--verification)
6. [Security & Rate Limiting](#6-security--rate-limiting)

---

## 1. Overview
The Todo SaaS email system uses **Nodemailer** to dispatch styled HTML email templates. It is designed to degrade gracefully: if environment configuration is incomplete or the SMTP server is down, errors are caught and logged, but they do **not** crash the application or interrupt user registration.

The system handles four types of emails:
1. **Welcome Email**: Sent automatically upon successful user signup.
2. **Email Verification**: Sent during signup to verify email addresses (expires in 24 hours).
3. **Password Reset Email**: Sent when requesting password reset (expires in 1 hour).
4. **Task Reminders**: Daily/weekly email digest of pending tasks.

---

## 2. Environment Configuration
Create or update the `.env` file in the `server` directory using the following keys. Refer to `server/.env.example` for a clean template.

```env
# Email Provider Selection ("gmail", "sendgrid", or "smtp")
EMAIL_SERVICE=gmail

# Sender Display Identity
EMAIL_FROM_NAME=Todo SaaS
EMAIL_FROM_ADDRESS=noreply@todosaas.com

# Client URL (for links inside templates)
CLIENT_URL=http://localhost:5173
```

---

## 3. Provider Configurations

### Option A: Gmail (For Development)
To use Gmail SMTP, you must generate a Google **App Password**. You cannot use your primary login password due to security blocks.

1. Go to your [Google Account Console](https://myaccount.google.com/).
2. Select **Security** on the left menu.
3. Under *How you sign in to Google*, ensure **2-Step Verification** is enabled (required for App Passwords).
4. Click on **2-Step Verification**, scroll to the bottom, and click on **App passwords**.
5. Enter a name (e.g., "Todo SaaS App") and click **Create**.
6. Copy the generated **16-character password** (e.g., `xxxx xxxx xxxx xxxx`).
7. Add the details to your `server/.env`:
   ```env
   EMAIL_SERVICE=gmail
   EMAIL_USER=your_gmail_address@gmail.com
   EMAIL_PASSWORD=your_16_character_app_password_without_spaces
   ```

### Option B: SendGrid (For Production)
To configure the system with SendGrid:

1. Create a SendGrid account at [SendGrid.com](https://sendgrid.com/).
2. Navigate to **Settings** > **API Keys** and click **Create API Key**.
3. Grant **Full Access** or restricted access to Mail Send and click **Create & View**.
4. Copy your API Key (starting with `SG.`).
5. Configure your `server/.env`:
   ```env
   EMAIL_SERVICE=sendgrid
   SENDGRID_API_KEY=SG.your_api_key_here
   EMAIL_FROM_ADDRESS=your_verified_sendgrid_sender@domain.com
   ```
   > [!IMPORTANT]
   > Make sure the `EMAIL_FROM_ADDRESS` matches your verified single sender or domain in SendGrid's console, otherwise SendGrid will reject the outbound mail.

### Option C: Mailtrap (For Sandbox Testing)
Mailtrap intercepts outgoing SMTP emails to a safe dashboard box, ensuring no real emails reach actual users.

1. Sign up for a free account at [Mailtrap.io](https://mailtrap.io/).
2. Go to **Email Testing** > **Inboxes** and click on your inbox.
3. Under **SMTP Settings**, select **Nodemailer** from the integrations dropdown.
4. Copy the host, port, username, and password credentials.
5. Configure your `server/.env`:
   ```env
   EMAIL_SERVICE=smtp
   SMTP_HOST=sandbox.smtp.mailtrap.io
   SMTP_PORT=2525
   SMTP_USER=your_mailtrap_username
   SMTP_PASS=your_mailtrap_password
   SMTP_SECURE=false
   ```

---

## 4. Integration Endpoints

### 1. Signup / Register
- **Endpoint**: `POST /api/auth/register`
- **Action**: Generates a verification token, saves it with a 24-hour expiration, and dispatches a **Welcome Email** and a **Verification Email**.
- **Payload**:
  ```json
  {
    "name": "Alex Smith",
    "email": "alex@example.com",
    "password": "Password123"
  }
  ```

### 2. Forgot Password
- **Endpoint**: `POST /api/auth/forgot-password`
- **Action**: Validates the email, creates a secure token, hashes it, stores it in the database with a 1-hour expiration, and sends the **Password Reset Email**.
- **Payload**:
  ```json
  {
    "email": "alex@example.com"
  }
  ```

### 3. Reset Password
- **Endpoint**: `POST /api/auth/reset-password`
- **Action**: Matches the token, verifies expiration, updates user's password, and clears reset tokens.
- **Payload**:
  ```json
  {
    "token": "verification_token_here",
    "password": "NewSecurePassword123"
  }
  ```

### 4. Verify Email
- **Endpoint**: `POST /api/auth/verify-email`
- **Action**: Compares the verification token and sets `isVerified` to `true`.
- **Payload**:
  ```json
  {
    "token": "verification_token_here"
  }
  ```

---

## 5. Testing & Verification
We have provided an automated test runner script to check your email service integrations without spinning up the server.

### Run Configuration Validation
When the server starts up, it automatically validates the environment configuration and logs any warnings to the console:
```bash
npm run dev
```
Watch the terminal for warnings such as:
`⚠️ [Email Config Warning] Email service configuration is incomplete...`

### Run Email Integration Sandbox Script
You can trigger sandbox test emails directly via:
```bash
node server/scratch/testEmailService.js
```
*(Ensure you have updated your `server/.env` file before executing)*

---

## 6. Security & Rate Limiting
To protect the application from abuse, spamming, and credential attacks, the following policies are enforced:
1. **Cooldown**: Minimum **1 minute** between successive emails of the same type to the same recipient.
2. **Hourly Cap**: Maximum **3 emails** per hour per user of the same type.
3. **Daily Cap (Password Reset)**: Maximum **10 password reset attempts** in 24 hours per user.
4. **Token Security**: Tokens are generated cryptographically and password reset tokens are stored in the database hashed with **SHA-256** to prevent database-compromise account takeovers.
