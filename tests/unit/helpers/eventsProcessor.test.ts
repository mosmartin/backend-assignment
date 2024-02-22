import { ethers } from "ethers";

import {
  getEvents,
  parseFeeCollectorEvent,
} from "../../../src/helpers/eventsProcessor";

describe("eventsProcessor helper functions", () => {
  describe("getEvents function", () => {
    it("should return an array of logs or event logs", async () => {
      const fromBlock: ethers.BlockTag = 0;
      const toBlock: ethers.BlockTag = "latest";
      const logs: (ethers.Log | ethers.EventLog)[] = [{} as ethers.Log];

      const feeCollector: ethers.Contract = {
        filters: {
          FeesCollected: jest.fn().mockReturnValue("mockFilter"),
        },
        queryFilter: jest.fn().mockResolvedValue(logs),
      } as unknown as ethers.Contract;

      const result = await getEvents(fromBlock, toBlock, feeCollector);

      expect(feeCollector.filters.FeesCollected).toHaveBeenCalled();
      expect(feeCollector.queryFilter).toHaveBeenCalledWith(
        "mockFilter",
        fromBlock,
        toBlock
      );
      expect(result).toEqual(logs);
    });
  });

  describe("parseFeeCollectorEvent function", () => {
    it("should parse the events and return the expected result", () => {
      const event: (ethers.Log | ethers.EventLog)[] = [
        {
          blockNumber: 123,
        } as ethers.Log,
      ];

      const parsedLog = {
        args: ["token", "integrator", "integratorFee", "lifiFee"],
      };

      const feeCollector: ethers.Contract = {
        interface: {
          parseLog: jest.fn().mockReturnValue(parsedLog),
        },
      } as unknown as ethers.Contract;

      const result = parseFeeCollectorEvent(event, feeCollector);

      expect(feeCollector.interface.parseLog).toHaveBeenCalledWith(event[0]);
      expect(result).toEqual([
        {
          token: "token",
          integrator: "integrator",
          integratorFee: "integratorFee",
          lifiFee: "lifiFee",
          blockNumber: BigInt(123),
        },
      ]);
    });
  });
});
