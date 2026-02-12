import type { Router as RouterType } from "express";
import { Router } from "express";

import authMiddleware from "../../middleware/auth";
import { userRoles } from "../../types";
import { userController } from "./user.controller";
const router = Router();

router.get("/", authMiddleware([userRoles.admin]), userController.getAllUser);
router.get(
  "/:id",

  userController.getUserById,
);
router.put(
  "/update-role",
  authMiddleware([userRoles.admin, userRoles.user]),
  userController.updateRole,
);
router.put("/update-info/:id", userController.updateUserInfo);

export const userRoutes: RouterType = router;
