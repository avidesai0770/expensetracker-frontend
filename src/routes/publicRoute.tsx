import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

export default PublicRoute;
