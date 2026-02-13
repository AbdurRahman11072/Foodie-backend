import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import customError from "../../error";
import asyncHandler from "../../lib/asyncRequestHandler";
import { prisma } from "../../lib/prisma";

const getAllMenu_items = async (req: Request, res: Response) => {
  try {
    const result = await prisma.menu_items.findMany();
    if (result.length === 0) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: "There is no items",
        data: null,
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "All menu_items",
      data: result,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Menu_items not found",
      data: error,
    });
  }
};

const createMenuItem = asyncHandler(async (req, res) => {
  const data = req.body;

  const result = await prisma.menu_items.create({
    data: {
      name: data.name as string,
      description: data.description as string,
      price: data.price as number,
      rating: data.rating as number,
      cuisine: data.cuisine as string,
      imageUrl: data.imageUrl as string,
      available: data.available as boolean,
      ingredients: data.ingredients as string[],
      deliveryTime: data.deliveryTime as string,
      allergens: data.allergens as string[],
      calories: data.calories as number,
      servingSize: data.servingSize as string,

      resturant: {
        connect: {
          id: data.restaurantId,
        },
      },
    },
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Item has been added",
    data: result,
  });
});

const getMenu_itemsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.menu_items.findFirst({
    where: { id: id as string },
  });
  if (!result)
    throw new customError(
      "There is no items made with the Id",
      httpStatus.NOT_FOUND,
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: "Items is found",
    data: result,
  });
});

const updataMenuItemInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const restaurantExist = await prisma.menu_items.findFirst({
    where: { id: id as string },
  });

  if (!restaurantExist)
    throw new customError(
      "Failed to update items information. Because items doesn't exist",
      httpStatus.BAD_REQUEST,
    );

  const result = await prisma.menu_items.update({
    where: { id: id as string },
    data: data,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "Items updated successfully",
    data: result,
  });
});

export const MenuitemsController = {
  getAllMenu_items,
  getMenu_itemsById,
  createMenuItem,
  updataMenuItemInfo,
};
