import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    
    await mongoose.connect(uri);
    console.log(`\n MongoDB connected: ${mongoose.connection.host}`);

  

  } catch (error) {
      console.log("MongoDB connection failed", error);
      process.exit(1)
  }
}

export default connectDB;