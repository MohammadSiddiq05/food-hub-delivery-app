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
  latitue: number;
  formattedAddress: string;
}

export interface AppContextType {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
