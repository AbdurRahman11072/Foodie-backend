import { Router } from "express";
import { RestaurantController } from "./restaurants.controller";

const router = Router();

router.get("/", RestaurantController.getAllRestaurants);

export const RestaurantsRoutes: Router = router;
