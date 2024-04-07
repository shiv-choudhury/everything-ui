import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import BaseContainer from "../Components/BaseContainer";

export default function UnauthRoutes() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="unauth-container">
      {!isLoading && isAuthenticated && (
        <BaseContainer>
          <Outlet />
        </BaseContainer>
      )}
    </div>
  );
}
