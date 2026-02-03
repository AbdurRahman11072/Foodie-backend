import { NextFunction, Request, Response } from "express";
import config from "../config";

const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isDev = config.NODE_ENV === "DEV";
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Error";

  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
    ...(isDev && {
      error: error,
      stackTrace: error.stack,
    }),
  });
};

export default globalErrorHandler;
