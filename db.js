const mongoose = require('mongoose');

// MongoDB URI
const MONGO_URI = 'mongodb://localhost:27017/jobpost';

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI); // No need for `useNewUrlParser` or `useUnifiedTopology`
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1); // Exit the process if connection fails
  }
};

module.exports = connectDB;
