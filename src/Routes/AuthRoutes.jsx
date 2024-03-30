import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthRoutes() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     window.location.href = "/login";
  //   }
  // })

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
