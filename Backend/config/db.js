const mongoose = require('mongoose');

const uri = "mongodb+srv://meam:1234@cluster0.zqpzp07.mongodb.net/?appName=Cluster00";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected with Mongoose");
  } catch (error) {
    console.error("❌ DB Connection Failed", error);
    process.exit(1);
  }
};

module.exports = connectDB;