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

    console.log("🟢 Connected to DB!\n");
  } catch (err) {
    console.error("🔴 Failed to connect to DB:", err);
  }
};

const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("🟢 Successfully disconnected from DB!\n");
  } catch (err) {
    console.error("🔴 Failed to disconnect from DB:", err);
  }
};

export { connectToDatabase, disconnectFromDatabase };
