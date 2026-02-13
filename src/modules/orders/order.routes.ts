import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

router.get("/", orderController.getAllOrders);
router.get("/:id", orderController.getOrdersById);

router.post("/create-order", orderController.createOrders);
router.put("/update-order-info/:id", orderController.updataOredertInfo);

export const ordersRoutes: Router = router;
