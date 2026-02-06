import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { auth } from "../lib/auth";

declare global {
  namespace express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const authMiddelware = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await auth.api.getSession({
        headers: req.header as any,
      });
      console.log(session?.user.role);

      next();
    } catch (error) {
      res.status(httpStatus.FORBIDDEN).json({
        success: false,
        message: "Unauthorized access",
      });
    }
  };
};

export default authMiddelware;
