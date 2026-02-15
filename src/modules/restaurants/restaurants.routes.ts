import { Router } from 'express';
import authMiddleware from '../../middleware/auth';
import { userRoles } from '../../types';
import { RestaurantController } from './restaurants.controller';

const router = Router();

router.get(
  '/',
  authMiddleware([userRoles.admin]),
  RestaurantController.getAllRestaurants
);
router.get('/:id', RestaurantController.getRestaurantById);

router.post('/create-restaurant', RestaurantController.createRestaurants);
router.put(
  '/update-restaurant-info/:id',
  authMiddleware([userRoles.admin, userRoles.seller]),
  RestaurantController.updataRestaurantInfo
);

export const RestaurantsRoutes: Router = router;
