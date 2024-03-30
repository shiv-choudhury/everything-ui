import { Typography } from "@mui/material";
import React from "react";
import BaseContainer from "../BaseContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function DashboardContent() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    navigate("/login");
  }

  return (
    <div>
      <BaseContainer>
        <Typography paragraph>Dashboard</Typography>
      </BaseContainer>
    </div>
  );
}
