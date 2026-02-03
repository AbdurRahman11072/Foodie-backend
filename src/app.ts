import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application } from "express";
import config from "./config";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);
// for better auth  make sure it is always below the cors and top of the express.json
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.use(globalErrorHandler);

export default app;
