const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

console.log('🔍 Starting server debug...');

// Load environment variables
dotenv.config();

console.log('📋 Environment check:');
console.log('- MONGODB_URI:', process.env.MONGODB_URI ? 'SET' : 'NOT SET');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? 'SET' : 'NOT SET');
console.log('- PORT:', process.env.PORT || '5000 (default)');
console.log('- EMAIL_USER:', process.env.EMAIL_USER ? 'SET' : 'NOT SET');
console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test MongoDB connection
async function testMongoDB() {
  try {
    console.log('🔌 Testing MongoDB connection...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/terracetop';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running and MONGODB_URI is correct');
  }
}

// Test email configuration
function testEmailConfig() {
  console.log('📧 Testing email configuration...');
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log('⚠️ Email credentials not set - OTPs will be logged to console');
  } else {
    console.log('✅ Email configuration found');
  }
}

// Start server
async function startServer() {
  try {
    await testMongoDB();
    testEmailConfig();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 Test URL: http://localhost:${PORT}/test`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
  }
}

startServer();
