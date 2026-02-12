import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import customError from "../../error";
import asyncHandler from "../../lib/asyncRequestHandler";
import { prisma } from "../../lib/prisma";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.status(httpStatus.OK).json({
      success: true,
      message: "User found",
      data: users,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "User not found",
      data: null,
    });
  }
};

const getUserById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new customError("Invalid user id", httpStatus.BAD_REQUEST);
  }
  const data = await prisma.user.findMany({
    where: { id: id as string },
  });
  res.status(httpStatus.OK).json({
    success: true,
    message: "User found",
    data: data,
  });
});

const updateRole = asyncHandler(async (req, res) => {
  const { userId, role } = req.body;
  const data = await prisma.user.update({
    where: { id: userId },
    data: {
      role,
    },
  });

  if (!data) {
    throw new customError(
      "user not found. Role update failed",
      httpStatus.NOT_FOUND,
    );
  }
  res.status(httpStatus.OK).json({
    success: true,
    message: "User role has been updated",
    data: data,
  });
});
export const userController = {
  getAllUser,
  updateRole,
  getUserById,
};
