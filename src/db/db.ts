import * as dotenv from "dotenv";
import mongoose from "mongoose";
import FeesCollectedEventModel from "../models/FeeCollectedEvent";

dotenv.config();

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_DB_PASS}:${process.env.MONGO_DB_PASS}@${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`,
      {
        dbName: process.env.MONGO_DB_NAME,
      }
    );

    createFeeCollectedEvent();

    console.log("🟢 Connected to MongoDB");
  } catch (error) {
    console.error("🔴 Failed to connect to MongoDB:", error);
  }
};

const createFeeCollectedEvent = () => {
  FeesCollectedEventModel.create({
    token: "0x0000000000000000000000000000000000000000",
    integrator: "0xD5e230cEa6dA2F0C62bdeED2Cf85326F1063e27D",
    integratorFee: BigInt(816000000000000),
    lifiFee: BigInt(144000000000000),
    blockNumber: BigInt(47962028),
  });
};

export default connectToDatabase;
