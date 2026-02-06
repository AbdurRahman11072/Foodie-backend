import type { Router as RouterType } from "express";
import { Router } from "express";
import authMiddelware from "../../middleware/auth";
import { userController } from "./user.controller";
const router = Router();

router.get("/", authMiddelware(), userController.getAllUser);

export const userRoutes: RouterType = router;
