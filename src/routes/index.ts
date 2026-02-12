import type { Router as RouterType } from "express";
import { Router } from "express";
import { RestaurantsRoutes } from "../modules/restaurants/restaurants.routes";
import { userRoutes } from "../modules/users/user.routes";

const router: RouterType = Router();
router.use("/users", userRoutes);
router.use("/restaurants", RestaurantsRoutes);

export const RootRoutes = router;
