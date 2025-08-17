# Registration System Setup Guide

## ✅ Issues Fixed

1. **Double Password Hashing**: Fixed the issue where passwords were being hashed twice
2. **Missing Role Field**: Added role field to User model
3. **Frontend-Backend Mismatch**: Updated frontend to use new OTP-based registration flow
4. **Email Configuration**: Added proper email setup instructions

## 🚀 Quick Setup

### 1. Create Environment File

Create a `.env` file in the `project/server/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/terracetop

# JWT Secret (generate a strong secret)
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Server Port
PORT=5000

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 2. Gmail Setup for OTP

1. **Enable 2-Step Verification** on your Google account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App Passwords
   - Generate new app password for "Mail"
3. **Use the app password** in your `.env` file

### 3. Test the Registration Flow

#### Option A: Using the Test Script
```bash
cd project
npm install axios  # if not already installed
node test-registration.js
```

#### Option B: Manual Testing

1. **Start the server**:
   ```bash
   cd project/server
   npm start
   ```

2. **Request Registration OTP**:
   ```bash
   POST http://localhost:5000/api/auth/request-register-otp
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "password123",
     "phone": "1234567890"
   }
   ```

3. **Check server console** for the OTP (in development mode)

4. **Verify OTP**:
   ```bash
   POST http://localhost:5000/api/auth/verify-register-otp
   {
     "email": "test@example.com",
     "otp": "YOUR_OTP_HERE"
   }
   ```

5. **Test Login**:
   ```bash
   POST http://localhost:5000/api/auth/login
   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

## 🔧 Registration Flow

### New OTP-Based Flow:
1. **Request OTP**: `POST /api/auth/request-register-otp`
2. **Verify OTP**: `POST /api/auth/verify-register-otp`
3. **User Created**: Automatically logged in after verification

### Password Reset Flow:
1. **Request Reset**: `POST /api/auth/request-password-reset`
2. **Verify OTP**: `POST /api/auth/verify-reset-otp`
3. **Reset Password**: `POST /api/auth/reset-password`

## 🐛 Troubleshooting

### Common Issues:

1. **"User already exists"**
   - Delete the user from MongoDB or use a different email

2. **"OTP not sent"**
   - Check email configuration in `.env`
   - Check server console for OTP (development mode)

3. **"Invalid credentials"**
   - Ensure password is at least 6 characters
   - Check if user was created successfully

4. **"Server error"**
   - Check MongoDB connection
   - Check server logs for detailed error

### Development Mode:
- OTPs are logged to console when email is not configured
- Look for: `** DEV MODE: OTP for email@example.com is: 123456 **`

## 📱 Frontend Integration

The frontend has been updated to work with the new OTP flow:

1. **Register page** → Requests OTP
2. **Verify OTP page** → Verifies OTP and completes registration
3. **User automatically logged in** after successful verification

## 🔒 Security Notes

- OTPs expire after 10 minutes
- Passwords are hashed using bcrypt
- JWT tokens expire after 1 day
- In production, use Redis for OTP storage instead of memory
