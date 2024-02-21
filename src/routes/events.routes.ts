import { Router } from "express";
import { getAllEventsByIntegrator } from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.get("/:integrator", getAllEventsByIntegrator);

export default eventRouter;
