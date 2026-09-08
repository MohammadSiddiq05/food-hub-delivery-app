import { useAppData } from "../context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { isAuth, loading, user } = useAppData();

  if (loading) return null;

  if (isAuth) {
    if (user?.role === null) {
      return <Navigate to="/select-role" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;