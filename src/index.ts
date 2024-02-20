import * as dotenv from "dotenv";
import { ethers } from "ethers";

import feeCollectorABI from "../abi/fee_collector_abi.json";
import connectToDatabase from "./db/db";
import { getEvents, parseFeeCollectorEvent } from "./utils/Utils";

dotenv.config();

const contractAddress = "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9";
const provider = new ethers.JsonRpcProvider(`${process.env.POLYGON_RPC_URL}`);
const blockNumber = 47961368;
const feeCollector = new ethers.Contract(
  contractAddress,
  feeCollectorABI,
  provider
);

const main = async () => {
  connectToDatabase();

  try {
    const currentBlock = await provider.getBlockNumber();

    const events = await getEvents(
      blockNumber,
      blockNumber + 1000,
      feeCollector
    );
    const parsedEvents = parseFeeCollectorEvent(events, feeCollector);
    console.log(currentBlock);
    console.log(parsedEvents);
  } catch (error) {
    console.error(error);
  }
};

main();
