import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { prisma } from "../../lib/prisma";

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const users = await prisma.restaurants.findMany();

    res.status(httpStatus.OK).json({
      success: true,
      message: "All Restaurant",
      result: users,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Restaurants not found",
      result: error,
    });
  }
};

export const RestaurantController = {
  getAllRestaurants,
};
