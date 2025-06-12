import { Outlet, replace, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

export const useAuth = () => {
  return localStorage.getItem("token");
};

const ProtectedRoutes = () => {
  const isAuthorized = useAuth();

  return isAuthorized ? <Outlet /> : <HomePage />;
};

export default ProtectedRoutes;
