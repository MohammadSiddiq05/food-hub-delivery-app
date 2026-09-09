import axios from "axios";
import getBuffer from "../config/datauri.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/tryCatch.js";
import restaurantSchema from "../models/restaurantSchema.js";

export const addRestaurant = TryCatch(
  async (req: AuthenticatedRequest, res) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "unauthorized",
      });
    }
    const existingRestaurant = await restaurantSchema.findOne({
      ownerId: user?._id,
    });

    if (existingRestaurant) {
      return res.status(400).json({
        message: "You already have a restaurant",
      });
    }

    const { name, description, latitude, longitude, formattedAddress, phone } =
      req.body;

    if (!name || !latitude || !longitude) {
      return res.status(400).json({
        message: "Please give all details",
      });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        message: "Please give a image of a restaurant",
      });
    }

    const fileBuffer = getBuffer(file);

    if (!fileBuffer?.content) {
      return res.status(400).json({
        message: "Failed to create a buffer file",
      });
    }

    const { data: uploadResult } = await axios.post(
      `${process.env.UTILS_SERVICE}/api/upload`,
      {
        buffer: fileBuffer.content,
      },
    );

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
    });
    return res.status(201).json({
      message: "Restaurant creates",
      restaurant,
    });
  },
);
