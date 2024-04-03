import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { Typography } from "@mui/material";

export default function Graphs() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && !isAuthenticated) {
    navigate("/login");
  }
  return (
    <div>
      <Typography paragraph>Graphs</Typography>
    </div>
  );
}
