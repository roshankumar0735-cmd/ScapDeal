const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async () => {
  console.log("---------------------------------------------------");
  console.log("📡 Attempting to connect to MongoDB...");
  console.log("🔗 URI:", process.env.MONGO_URI);
  console.log("---------------------------------------------------");

  try {
    const start = Date.now();

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const end = Date.now();

    console.log("✅ MongoDB Connection Successful!");
    console.log("---------------------------------------------------");
    console.log("🗂  Database Name:", conn.connection.name);
    console.log("🖥  Host:", conn.connection.host);
    console.log("🔌 Port:", conn.connection.port);
    console.log("⏱  Connection Time:", end - start + "ms");
    console.log("📁 Collections:", Object.keys(conn.connection.collections));
    console.log("---------------------------------------------------");

    logger.info(`MongoDB Connected: ${conn.connection.host}`);

  } catch (error) {
    console.log("❌ MongoDB Connection Failed!");
    console.log("---------------------------------------------------");
    console.log("Error Message:", error.message);
    console.log("Stack:", error.stack);
    console.log("---------------------------------------------------");

    logger.error('MongoDB connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
