import { Request, Response } from "express";
import FeesCollectedEventModel from "../models/event.model";

export const getAllEventsByIntegrator = async (req: Request, res: Response) => {
  try {
    const { integrator } = req.params;

    if (!integrator) {
      return res.status(400).json({ message: "Integrator is required" });
    }

    const events = await FeesCollectedEventModel.find({ integrator });

    if (!events) {
      return res.status(404).json({ message: "No events found" });
    }

    // serilize the data, bigints are not supported in JSON
    const serializedData = events.map((event) => {
      return {
        token: event.token,
        integrator: event.integrator,
        integratorFee: event.integratorFee.toString(),
        lifiFee: event.lifiFee.toString(),
        blockNumber: event.blockNumber.toString(),
      };
    });

    return res.status(200).json({ data: serializedData });
  } catch (err) {
    console.error("🔴 Failed to get events by integrator:", err);
    return res
      .status(500)
      .json({ message: "Failed to get events by integrator" });
  }
};
