import { Router } from "express";
import { MenuitemsController } from "./menu.controller";

const router = Router();

router.get("/", MenuitemsController.getAllMenu_items);
router.get("/:id", MenuitemsController.getMenu_itemsById);

router.post("/", MenuitemsController.createMenuItem);
router.put("/:id", MenuitemsController.updataMenuItemInfo);

export const menuRoutes: Router = router;
