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
  } catch (error) {
    console.error("🔴 Failed to get latest block number:", error);
    throw error;
  }
};

export const saveFeeCollectedEvent = async (
  events: ParsedFeeCollectedEvent[]
) => {
  try {
    await FeesCollectedEventModel.create(events);
  } catch (error) {
    console.error("🔴 Failed to save events to database:", error);
    throw error;
  }
};
