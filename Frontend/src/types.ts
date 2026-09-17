import type React from "react";

export interface User {
  _id: string;
  name: String;
  email: String;
  image: String;
  role: String;
}

export interface LocationData {
  longitude: number;
  latitude: number;
  formattedAddress: string;
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  location: LocationData | null;
  loadingLocation: boolean;
  city: string;
}

export interface IRestaurant {
  _id: string;
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

export interface IMenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  image?: string;
  price: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICart {
  userId: string;
  restaurantId: string | IRestaurant;
  itemId: string | IMenuItem;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
