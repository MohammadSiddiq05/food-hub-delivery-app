import axios from "axios";
import getBuffer from "../config/datauri.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/tryCatch.js";
import restaurantSchema from "../models/restaurantSchema.js";
import jwt from "jsonwebtoken";

export const addRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "unauthorized" });
    }

    const existingRestaurant = await restaurantSchema.findOne({
      ownerId: user._id,
    });

    if (existingRestaurant) {
      return res.status(400).json({ message: "You already have a restaurant" });
    }

    const { name, description, latitude, longitude, formattedAddress, phone } =
      req.body;

    if (!name || !latitude || !longitude || !phone) {
      return res.status(400).json({ message: "Please give all details" });
    }

    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ message: "Please give a image of a restaurant" });
    }

    const fileBuffer = getBuffer(file);
    if (!fileBuffer?.content) {
      return res
        .status(400)
        .json({ message: "Failed to create a buffer file" });
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UTILS_SERVICE}/api/upload`,
      { buffer: fileBuffer.content },
    );

    if (!uploadResult?.url) {
      return res.status(500).json({ message: "Failed to upload image" });
    }

    const restaurant = await restaurantSchema.create({
      name,
      description,
      phone,
      image: uploadResult.url,
      ownerId: user._id,
      autoLocation: {
        type: "Point",
        coordinates: [Number(longitude), Number(latitude)],
        formattedAddress,
      },
      isVerified: false,
    });

    return res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  },
);

export const fetchMyRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    if (!req.user) {
      return res.status(401).json({ message: "Please Login" });
    }

    const restaurant = await restaurantSchema.findOne({
      ownerId: req.user._id,
    });

    if (!restaurant) {
      return res.status(404).json({ message: "No restaurant found" });
    }

    if (!req.user.restaurantId) {
      const token = jwt.sign(
        {
          user: {
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            image: req.user.image,
            role: req.user.role,
            restaurantId: restaurant._id,
          },
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "15d" },
      );

      return res.json({ restaurant, token });
    }

    res.json({ restaurant });
  },
);
