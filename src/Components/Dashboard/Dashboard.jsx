import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Typography } from "@mui/material";

import BaseContainer from "../BaseContainer";

export default function DashboardContent() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <BaseContainer>
        <Typography paragraph>Dashboard</Typography>
      </BaseContainer>
    </div>
  );
}
