import mongoose from "mongoose";
import FeesCollectedEventModel from "../models/FeeCollectedEvent";
import { ParsedFeeCollectedEvent } from "../utils/Utils";

export const getLatestDbBlockNumber = async (): Promise<bigint> => {
  try {
    const blockNumber = await FeesCollectedEventModel.findOne().sort({
      blockNumber: -1,
    });

    if (blockNumber) {
      return blockNumber.blockNumber;
    } else {
      return BigInt(47961368);
    }
  } catch (err) {
    console.error("🔴 Failed to get latest block number:", err);
    throw err;
  }
};

export const saveFeeCollectedEvent = async (
  events: ParsedFeeCollectedEvent[]
) => {
  try {
    await FeesCollectedEventModel.create(events);
  } catch (err: any) {
    if (err.code === 11000) {
      console.log("🚨 Duplicate entry, skipping already processed block...");
      return;
    }

    throw err;
  }
};
