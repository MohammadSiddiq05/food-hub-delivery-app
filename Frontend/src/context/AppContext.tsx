import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { authService } from "../main";
import type { AppContextType, LocationData, User } from "../types";
import { Toaster } from "react-hot-toast";

interface AppContextProviderProps {
  children: ReactNode;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [city, setCity] = useState("Fetching location...");

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${authService}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(data.user);
      setIsAuth(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Please allow location to continue");
      return;
    }
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { longitude, latitude } = position.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
          );
          const data = await res.json();

          setLocation({
            latitude,
            longitude,
            formattedAddress: data.display_name || "current location",
          });

          setCity(
            data.address.city ||
              data.address.town ||
              data.address.village ||
              "Your location",
          );
        } catch (error) {
          setLocation({
            latitude,
            longitude,
            formattedAddress: "Current location",
          });
          setCity("Failed to load");
          console.log(error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.log("Geolocation error:", error);
        setCity("Location permission denied");
        setLoadingLocation(false);
      },
    );
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuth,
        loading,
        setIsAuth,
        setLoading,
        setUser,
        user,
        location,
        loadingLocation,
        city,
      }}
    >
      {children}
      <Toaster />
    </AppContext.Provider>
  );
};

export const useAppData = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) throw new Error("UseAppData must be used within appProvider");

  return context;
};
