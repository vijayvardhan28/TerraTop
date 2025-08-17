const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Testing MongoDB connection...');
    console.log('Connection string:', process.env.MONGODB_URI || 'mongodb://localhost:27017/terracetop');
    
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/terracetop', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB connected successfully!');
    console.log('Database:', mongoose.connection.db.databaseName);
    
    // Test creating a collection
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Existing collections:', collections.map(c => c.name));
    
    await mongoose.connection.close();
    console.log('✅ Connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Make sure MongoDB is running');
    console.log('2. Check your .env file has MONGODB_URI');
    console.log('3. For local MongoDB: mongod --dbpath /path/to/data');
    console.log('4. For Atlas: Check network access and connection string');
  }
}

testConnection();
