import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import customError from "../error";
import { auth } from "../lib/auth";

declare global {
  namespace express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: "user" | "seller" | "admin";
        emailVerified: boolean;
      };
    }
  }
}

const authMiddleware = (role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("authMiddleware");

      const session = await auth.api.getSession({
        headers: req.headers as any,
      });
      req.user = {
        id: session?.user?.id as string,
        name: session?.user?.name as string,
        email: session?.user?.email as string,
        role: session?.user?.role as "user" | "seller" | "admin",
        emailVerified: session?.user?.emailVerified as boolean,
      };

      console.log("session: ", session);
      console.log(role);

      if (!role.includes(session?.user?.role as string)) {
        throw new customError("Unauthorized access", httpStatus.FORBIDDEN);
      }

      next();
    } catch (error) {
      res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Unauthorized access",
      });
    }
  };
};

export default authMiddleware;
