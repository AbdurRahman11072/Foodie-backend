import type { Router as RouterType } from "express";
import { Router } from "express";
import { userController } from "./user.controller";
const router = Router();

router.get("/", userController.getAllUser);

export const userRoutes: RouterType = router;
