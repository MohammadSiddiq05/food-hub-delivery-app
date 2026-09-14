import express from "express";
import isAuth, { isSeller } from "../middlewares/isAuth.js";
import {
  addMenuItem,
  deleteMenuItems,
  getAllItems,
  toggleMenuItemAvailability,
} from "../controllers/menuItems.js";

const router = express.Router();

router.post("/new", isAuth, isSeller, addMenuItem);
router.get("/all/:id", isAuth, getAllItems);
router.delete("/status/:itemId", isAuth, isSeller, toggleMenuItemAvailability);
router.delete("/:itemId", isAuth, isSeller, deleteMenuItems);
export default router;
