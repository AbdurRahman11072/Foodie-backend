import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrdersById);

router.post("/", orderController.createOrders);
router.put("/:id", orderController.updataOredertInfo);

export const ordersRoutes: Router = router;
