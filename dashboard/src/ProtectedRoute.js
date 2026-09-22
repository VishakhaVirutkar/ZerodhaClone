import React from "react";

import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if (!user) {
    window.location.href = "http://localhost:3001/login";
    return null;
  }

  return children;
};

export default ProtectedRoute;