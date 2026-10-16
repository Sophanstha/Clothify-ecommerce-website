import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  // Also check localStorage as fallback for state persistence
  const savedUser = user || (localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null);
  const token = localStorage.getItem("userToken") || localStorage.getItem("token");

  // If not logged in, redirect to login page
  if (!savedUser || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role requirement is specified, verify user has that role
  if (roleRequired && savedUser.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
