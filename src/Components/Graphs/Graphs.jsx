import React from "react";
import BaseContainer from "../BaseContainer";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Graphs() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log("isgraphAuth", isAuthenticated);

  if (!isLoading && !isAuthenticated) {
    navigate("/login");
  }
  return (
    <div>
      <BaseContainer>
        <Typography paragraph>Graphs</Typography>
      </BaseContainer>
    </div>
  );
}
