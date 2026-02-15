import { Request, Response } from 'express';
import httpStatus from 'http-status-codes';
import customError from '../../error';
import asyncHandler from '../../lib/asyncRequestHandler';
import { prisma } from '../../lib/prisma';
import { userRoles } from '../../types';

const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const result = await prisma.restaurants.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        deliveryTime: true,
        address: true,
        rating: true,
        _count: {
          select: {
            menuItem: true,
          },
        },
      },
    });

    const formattedRestaurants = result.map(({ _count, ...restaurant }) => ({
      ...restaurant,
      menuItemCount: _count.menuItem,
    }));
    if (result.length === 0) {
      return res.status(httpStatus.OK).json({
        success: true,
        message: 'No restaurant in the database',
        data: null,
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: 'All Restaurant',
      data: formattedRestaurants,
    });
  } catch (error) {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: 'Restaurants not found',
      data: error,
    });
  }
};

const createRestaurants = asyncHandler(async (req, res) => {
  const data = req.body;
  const checkRestaurant = await prisma.restaurants.findFirst({
    where: { ownerId: data.ownerId },
  });
  if (checkRestaurant)
    throw new customError(
      "User already have a restaurant. Can't create second restaurant",
      httpStatus.FORBIDDEN
    );
  const result = await prisma.restaurants.create({
    data: {
      name: data.name,
      description: data.description,
      address: data.address,
      phone: data.phone,
      rating: data.rating,
      image: data.image,
      deliveryTime: data.deliveryTime,
      openingTime: data.openingTime,
      offday: data.offday,
      user: {
        connect: {
          id: data.ownerId,
        },
      },
    },
  });

  const updateUserInfo = await prisma.user.update({
    where: {
      id: data.ownerId as string,
    },
    data: {
      role: userRoles.seller,
    },
  });

  if (!updateUserInfo && result) {
    throw new customError(
      'Something went wrong.To access restaurant dashboard contact us',
      httpStatus.BAD_REQUEST
    );
  }

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Restaurant has been found with the id',
    data: result,
  });
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const result = await prisma.restaurants.findUnique({
    where: { ownerId: id as string },
    include: {
      menuItem: true,
    },
  });
  if (!result)
    throw new customError(
      'There is no restaurant with the id',
      httpStatus.NOT_FOUND
    );
  res.status(httpStatus.OK).json({
    success: true,
    message: 'Restaurant has been found with the id',
    data: result,
  });
});

const updataRestaurantInfo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const restaurantExist = await prisma.restaurants.findFirst({
    where: { id: id as string },
  });

  if (!restaurantExist)
    throw new customError(
      "Failed to update restaurant information. Because restaurat doesn't exist",
      httpStatus.BAD_REQUEST
    );

  const result = await prisma.restaurants.update({
    where: { id: id as string },
    data: data,
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Information updated successfully',
    data: result,
  });
});

export const RestaurantController = {
  getAllRestaurants,
  getRestaurantById,
  createRestaurants,
  updataRestaurantInfo,
};
