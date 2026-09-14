import express from "express";
import isAuth, { isSeller } from "../middlewares/isAuth.js";
import {
  addMenuItem,
  deleteMenuItems,
  getAllItems,
  toggleMenuItemAvailability,
} from "../controllers/menuItems.js";
import uploadFile from "../middlewares/multer.js";

const router = express.Router();

router.post("/new", isAuth, isSeller,uploadFile, addMenuItem);
router.get("/all/:id", isAuth, getAllItems);
router.put("/status/:itemId", isAuth, isSeller, toggleMenuItemAvailability);
router.delete("/:itemId", isAuth, isSeller, deleteMenuItems);
export default router;
