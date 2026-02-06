import type { Router as RouterType } from "express";
import { Router } from "express";

import authMiddleware from "../../middleware/auth";
import { userRoles } from "../../types";
import { userController } from "./user.controller";
const router = Router();

router.get("/", authMiddleware([userRoles.admin]), userController.getAllUser);
router.post("/update-role", userController.updateRole);

export const userRoutes: RouterType = router;
