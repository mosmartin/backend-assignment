import express from "express";

import eventsRouter from "./routes/events.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/events", eventsRouter);

export default app;
