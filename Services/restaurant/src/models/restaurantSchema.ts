import mongoose, { Schema, Document, Types } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  description?: string;
  image: string;
  ownerId: string;
  phone: string;
  isVerified: boolean;

  autoLocation: {
    type: "Point";
    coordinates: [number, number];
    formattedAddress: string;
  };

  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const schema = new Schema<IRestaurant>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    image: {
      type: String,
      required: true,
    },
    ownerId: {
      type: String,
      ref: "User",
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    autoLocation: {
      type: {
        type: String,
        enum: ["Point"],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      formattedAddress: {
        type: String,
      },
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

schema.index({ autoLocation: "2dsphere" });

export default mongoose.model<IRestaurant>("Restaurant", schema);