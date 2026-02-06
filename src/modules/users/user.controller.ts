import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../../lib/prisma";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(httpStatus.OK).json({
      success: true,
      message: "User found",
      result: users,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
      result: error,
    });
  }
};

const updateRole = async (req: Request, res: Response) => {
  try {
    const { userId, role } = req.body;
    const data = await prisma.user.update({
      where: { id: userId },
      data: {
        role,
      },
    });
    res.status(httpStatus.OK).json({
      success: true,
      Result: data,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
      result: error,
    });
  }
};

export const userController = {
  getAllUser,
  updateRole,
};
