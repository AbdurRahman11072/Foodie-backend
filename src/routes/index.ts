import type { Router as RouterType } from "express";
import { Router } from "express";
import { userRoutes } from "../modules/users/user.routes";

const router: RouterType = Router();
router.use("/users", userRoutes);

export const RootRoutes = router;
