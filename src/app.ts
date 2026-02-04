import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import config from "./config";
import { notFound } from "./error/notFound";
import { auth } from "./lib/auth";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { RootRoutes } from "./routes";

const app: Application = express();

app.use(
  cors({
    origin: config.FRONTEND_URL,
    credentials: true,
  }),
);

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use("/api/v1", RootRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello there");
});

app.all(/(.*)/, notFound);

async function CreateAdmin() {
  await auth.api.createUser({
    body: {
      name: config.ADMIN_NAME as string,
      email: config.ADMIN_EMAIL as string,
      password: config.ADMIN_PASSWORD as string,
      role: "admin",
    },
  });
}

CreateAdmin();

app.use(globalErrorHandler);
export default app;
