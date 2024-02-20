import * as dotenv from "dotenv";
import { ethers } from "ethers";
import { BlockTag } from "@ethersproject/abstract-provider";

import feeCollectorABI from "../abi/fee_collector_abi.json";
import connectToDatabase from "./db/db";

dotenv.config();

interface ParsedFeeCollectedEvent {
  token: string;
  integrator: string;
  integratorFee: BigInt;
  lifiFee: BigInt;
  blockNumber: bigint;
}

const contractAddress = "0xbD6C7B0d2f68c2b7805d88388319cfB6EcB50eA9";
const provider = new ethers.JsonRpcProvider(`${process.env.POLYGON_RPC_URL}`);
const blockNumber = 47961368;
const feeCollector = new ethers.Contract(
  contractAddress,
  feeCollectorABI,
  provider
);

const getEvents = async (
  fromBlock: BlockTag,
  toBlock: BlockTag
): Promise<(ethers.Log | ethers.EventLog)[]> => {
  const filter = feeCollector.filters.FeesCollected();
  return feeCollector.queryFilter(filter, fromBlock, toBlock);
};

const parseFeeCollectorEvent = (
  event: (ethers.Log | ethers.EventLog)[]
): ParsedFeeCollectedEvent[] => {
  return event.map((e) => {
    const parsedEvent = feeCollector.interface.parseLog(e);

    const parsed: ParsedFeeCollectedEvent = {
      token: parsedEvent?.args[0],
      integrator: parsedEvent?.args[1],
      integratorFee: parsedEvent?.args[2],
      lifiFee: parsedEvent?.args[3],
      blockNumber: BigInt(e.blockNumber),
    };

    return parsed;
  });
};

const main = async () => {
  connectToDatabase();

  try {
    const currentBlock = await provider.getBlockNumber();

    const events = await getEvents(blockNumber, blockNumber + 1000);
    const parsedEvents = parseFeeCollectorEvent(events);
    console.log(currentBlock);
    console.log(parsedEvents);
  } catch (error) {
    console.error(error);
  }
};

main();
