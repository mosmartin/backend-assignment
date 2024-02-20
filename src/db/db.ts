import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_PASS}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`,
      {
        dbName: process.env.MONGO_DB_DATABASE,
      }
    );

    console.log("🟢 Connected to MongoDB!\n");
  } catch (error) {
    console.error("🔴 Failed to connect to MongoDB:", error);
  }
};

export default connectToDatabase;
