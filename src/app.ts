import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import config from "./config";
import { auth } from "./lib/auth";
import { RootRoutes } from "./routes";

const app: Application = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use("/api/v1", RootRoutes);

// app.use(globalErrorHandler);

export default app;
