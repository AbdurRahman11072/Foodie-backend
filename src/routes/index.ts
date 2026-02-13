import type { Router as RouterType } from "express";
import { Router } from "express";
import { menuRoutes } from "../modules/menus/menu.routes";
import { ordersRoutes } from "../modules/orders/order.routes";
import { RestaurantsRoutes } from "../modules/restaurants/restaurants.routes";
import { userRoutes } from "../modules/users/user.routes";

const router: RouterType = Router();
router.use("/users", userRoutes);
router.use("/restaurants", RestaurantsRoutes);
router.use("/orders", ordersRoutes);
router.use("/menu-items", menuRoutes);

export const RootRoutes = router;
