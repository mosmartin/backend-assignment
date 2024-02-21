import FeesCollectedEventModel from "../models/event.model";
import { ParsedFeeCollectedEvent } from "../helpers/eventsProcessor";

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

export const getEventsByIntegrator = async (integrator: string) => {
  try {
    console.log("🔍 Searching for events by integrator:", integrator);
    const events = await FeesCollectedEventModel.find();
    return events;
  } catch (err) {
    console.error("🔴 Failed to get events by integrator: 🚨", err);
    throw err;
  }
};
