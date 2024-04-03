import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Typography } from "@mui/material";

export default function DashboardContent() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Typography paragraph>Dashboard</Typography>
    </div>
  );
}
