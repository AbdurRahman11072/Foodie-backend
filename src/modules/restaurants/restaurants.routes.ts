import { Router } from "express";
import { RestaurantController } from "./restaurants.controller";

const router = Router();

router.get("/", RestaurantController.getAllRestaurants);
router.get("/:id", RestaurantController.getRestaurantById);

router.post("/create-restaurant", RestaurantController.createRestaurants);

export const RestaurantsRoutes: Router = router;
