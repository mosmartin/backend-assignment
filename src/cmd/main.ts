import * as dotenv from "dotenv";
import { ethers } from "ethers";

import feeCollectorABI from "../../abi/fee_collector_abi.json";
import { connectToDatabase, disconnectFromDatabase } from "../db/dbConn";
import { getEvents, parseFeeCollectorEvent } from "../helpers/eventsProcessor";
import {
  getLatestDbBlockNumber,
  saveFeeCollectedEvent,
} from "../db/FeeCollectorEvents";

dotenv.config();

const contractAddress = "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9";
const provider = new ethers.JsonRpcProvider(`${process.env.POLYGON_RPC_URL}`);
const feeCollector = new ethers.Contract(
  contractAddress,
  feeCollectorABI,
  provider
);

const main = async () => {
  await connectToDatabase();

  try {
    const currentBlockHeight = await provider.getBlockNumber();
    let highestDbBlockHeight = await getLatestDbBlockNumber();

    if (Number(highestDbBlockHeight) >= currentBlockHeight) {
      console.log("No new events to process");
    } else {
      const blockBatchSize = Number(process.env.BLOCK_BATCH_SIZE) || 1000; // Ensure this is optimally set

      while (Number(highestDbBlockHeight) < currentBlockHeight) {
        const endBlock = Math.min(
          Number(highestDbBlockHeight) + blockBatchSize,
          currentBlockHeight
        );

        const events = await getEvents(
          Number(highestDbBlockHeight) + 1,
          endBlock,
          feeCollector
        );

        if (events.length > 0) {
          const parsedEvents = events
            .map((event) => parseFeeCollectorEvent([event], feeCollector))
            .flat();

          await saveFeeCollectedEvent(parsedEvents);

          console.log(
            `Processed ${parsedEvents.length} events up to block ${endBlock}`
          );
        }

        highestDbBlockHeight = BigInt(endBlock);

        if (BigInt(endBlock) === BigInt(currentBlockHeight)) {
          console.log("All events processed. Exiting...");
          break;
        }
      }
    }
  } catch (err) {
    console.error(err);
  } finally {
    await disconnectFromDatabase();
  }
};

main();
