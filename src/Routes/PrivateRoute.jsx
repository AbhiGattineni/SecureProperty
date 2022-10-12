import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
