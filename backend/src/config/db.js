const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Try to connect using the MONGO_URI from .env file
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    // If successful, print the host name in terminal
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If connection fails, print the error and stop the app
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // 1 means exit with failure
  }
};

module.exports = connectDB;