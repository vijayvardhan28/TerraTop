const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

console.log('🚀 Starting simplified server...');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!' });
});

// Test auth route (simplified)
app.get('/api/auth/test', (req, res) => {
  res.json({ message: 'Auth route is working!' });
});

// MongoDB Connection
async function connectDB() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/terracetop';
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('💡 Make sure MongoDB is running');
  }
}

// Start server
async function startServer() {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`🌐 Test URL: http://localhost:${PORT}/`);
      console.log(`🔐 Auth test: http://localhost:${PORT}/api/auth/test`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error.message);
  }
}

startServer();
