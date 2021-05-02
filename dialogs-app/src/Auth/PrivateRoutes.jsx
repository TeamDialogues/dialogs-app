import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const PrivateRoutes = ({ path, ...props }) => {
  const { authStates } = useAuth();
  return authStates.isLoggedIn ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
};
