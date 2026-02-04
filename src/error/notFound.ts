import { RequestHandler } from "express";
import customError from ".";

export const notFound: RequestHandler = async (req, res, next) => {
  const msg = `Can't find this Route: ${req.originalUrl}`;
  const error = new customError(msg, 404);
  next(error);
};
