const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123',
  phone: '1234567890',
  role: 'user'
};

async function testRegistration() {
  try {
    console.log('🚀 Testing Registration Flow...\n');

    // Step 1: Request Registration OTP
    console.log('1. Requesting Registration OTP...');
    const otpResponse = await axios.post(`${API_BASE_URL}/auth/request-register-otp`, testUser);
    console.log('✅ OTP Request Response:', otpResponse.data);
    console.log('📧 Check your server console for the OTP\n');

    // Step 2: Verify Registration OTP (you'll need to manually enter the OTP)
    console.log('2. To verify OTP, make a POST request to:');
    console.log(`${API_BASE_URL}/auth/verify-register-otp`);
    console.log('With body: { "email": "test@example.com", "otp": "YOUR_OTP_HERE" }\n');

    // Step 3: Test Login
    console.log('3. After successful registration, test login with:');
    console.log(`${API_BASE_URL}/auth/login`);
    console.log('With body: { "email": "test@example.com", "password": "password123" }\n');

  } catch (error) {
    console.error('❌ Error during registration test:', error.response?.data || error.message);
    
    if (error.response?.status === 400) {
      console.log('\n💡 Possible issues:');
      console.log('- User already exists with this email');
      console.log('- Missing required fields');
      console.log('- Invalid email format');
    } else if (error.response?.status === 500) {
      console.log('\n💡 Server error - check your server logs');
    }
  }
}

async function testPasswordReset() {
  try {
    console.log('🔐 Testing Password Reset Flow...\n');

    // Step 1: Request Password Reset OTP
    console.log('1. Requesting Password Reset OTP...');
    const otpResponse = await axios.post(`${API_BASE_URL}/auth/request-password-reset`, {
      email: 'test@example.com'
    });
    console.log('✅ Password Reset OTP Response:', otpResponse.data);
    console.log('📧 Check your server console for the OTP\n');

    // Step 2: Verify Password Reset OTP
    console.log('2. To verify password reset OTP, make a POST request to:');
    console.log(`${API_BASE_URL}/auth/verify-reset-otp`);
    console.log('With body: { "email": "test@example.com", "otp": "YOUR_OTP_HERE" }\n`);

    // Step 3: Reset Password
    console.log('3. To reset password, make a POST request to:');
    console.log(`${API_BASE_URL}/auth/reset-password`);
    console.log('With body: { "email": "test@example.com", "newPassword": "newpassword123" }\n');

  } catch (error) {
    console.error('❌ Error during password reset test:', error.response?.data || error.message);
  }
}

// Run tests
console.log('🧪 Registration and Password Reset Test Script\n');
console.log('Make sure your server is running on http://localhost:5000\n');

// Uncomment the test you want to run
testRegistration();
// testPasswordReset();
