import axios from "axios";
import getBuffer from "../config/datauri.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/tryCatch.js";
import restaurantSchema from "../models/restaurantSchema.js";
import menuItems from "../models/menuItems.js";

export const addMenuItem = TryCatch(async (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Please Login",
    });
  }

  const restaurant = await restaurantSchema.findOne({ ownerId: req.user._id });

  if (!restaurant) {
    return res.status(404).json({
      message: "No restaurnt found",
    });
  }

  const { name, description, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      message: "Name and Price are required",
    });
  }

  const file = req.file;
  if (!file) {
    return res
      .status(400)
      .json({ message: "Please give a image of a restaurant" });
  }

  const fileBuffer = getBuffer(file);
  if (!fileBuffer?.content) {
    return res.status(400).json({ message: "Failed to create a buffer file" });
  }

  const { data: uploadResult } = await axios.post(
    `${process.env.UTILS_SERVICE}/api/upload`,
    { buffer: fileBuffer.content },
  );

  const items = await menuItems.create({
    name,
    description,
    price,
    restaurantId: restaurant._id,
    image: uploadResult.url,
  });

  res.json({ message: "Item added successfully", items });
});

export const getAllItems = TryCatch(async (req: AuthenticatedRequest, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "Id is required",
    });
  }
  const items = await menuItems.find({ restaurantId: id });

  res.json(items);
});

export const deleteMenuItems = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Please Login",
      });
    }
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({
        message: "Item id is required",
      });
    }

    const items = await menuItems.findById(itemId);

    if (!items) {
      return res.status(400).json({
        message: "No items found",
      });
    }

    const restaurant = await restaurantSchema.findOne({
      _id: items.restaurantId,
      ownerId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "No restaurnt found",
      });
    }

    await items.deleteOne();

    res.json({
      message: "Menu item deleted successfully",
    });
  },
);

export const toggleMenuItemAvailability = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Please Login",
      });
    }
    const { itemId } = req.params;
    if (!itemId) {
      return res.status(400).json({
        message: "Item id is required",
      });
    }

    const items = await menuItems.findById(itemId);

    if (!items) {
      return res.status(400).json({
        message: "No items found",
      });
    }

    const restaurant = await restaurantSchema.findOne({
      _id: items.restaurantId,
      ownerId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({
        message: "No restaurnt found",
      });
    }

    items.isAvailable = !items.isAvailable;
    await items.save();

    res.json({
      message: `Item Marked as ${items.isAvailable ? "available" : "unavailable"}`,
      items,
    });
  },
);
