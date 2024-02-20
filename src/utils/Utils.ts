import { ethers } from "ethers";
import { BlockTag } from "@ethersproject/abstract-provider";

export interface ParsedFeeCollectedEvent {
  token: string;
  integrator: string;
  integratorFee: BigInt;
  lifiFee: BigInt;
  blockNumber: bigint;
}

export const getEvents = async (
  fromBlock: BlockTag,
  toBlock: BlockTag,
  feeCollector: ethers.Contract
): Promise<(ethers.Log | ethers.EventLog)[]> => {
  const filter = feeCollector.filters.FeesCollected();
  return feeCollector.queryFilter(filter, fromBlock, toBlock);
};

export const parseFeeCollectorEvent = (
  event: (ethers.Log | ethers.EventLog)[],
  feeCollector: ethers.Contract
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
