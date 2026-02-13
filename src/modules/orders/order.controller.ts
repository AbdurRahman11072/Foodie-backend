import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import customError from "../../error";
import asyncHandler from "../../lib/asyncRequestHandler";
import { prisma } from "../../lib/prisma";

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const result = await prisma.orders.findMany();
    if (result.length === 0) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: "There is no order",
        data: null,
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "All orders",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Orders not found",
      data: error,
    });
  }
};

const createOrders = asyncHandler(async (req, res) => {
  const data = req.body;
  const result = await prisma.orders.create({
    data: {
      quantity: data.quantity as number,
      deliveryAddress: data.deliveryAddress as string,
      status: data.status,
      paymentMethod: data.paymentMethod as string,
      customer: {
        connect: {
          id: data.customerId as string,
        },
      },
      restaurant: {
        connect: {
          id: data.restaurantId as string,
        },
      },
      menuItem: {
        connect: {
          id: data.menuItemId as string,
        },
      },
    },
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Order successfull",
    data: result,
  });
});

const getOrdersById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.orders.findFirst({
    where: { customerId: id as string },
  });
  if (!result)
    throw new customError(
      "There is no order made with the Id",
      httpStatus.NOT_FOUND,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: "Order is found",
    data: result,
  });
});

const updataOredertInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const restaurantExist = await prisma.orders.findFirst({
    where: { id: id as string },
  });

  if (!restaurantExist)
    throw new customError(
      "Failed to update order information. Because order doesn't exist",
      httpStatus.BAD_REQUEST,
    );

  const result = await prisma.orders.update({
    where: { id: id as string },
    data: data,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

export const orderController = {
  getAllOrders,
  getOrdersById,
  createOrders,
  updataOredertInfo,
};
