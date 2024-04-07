import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";

import { Button, Grid, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import GitCommitHistory from "../Graphs/GitCommitHistory";
import { GraphComponent } from "../Graphs/GraphComponent";

export default function DashboardContent() {
  const { isAuthenticated, isLoading } = useAuth0();
  const childRef = useRef();

  if (!isLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Grid container columnGap={1}>
        <Grid item>
          <Typography variant="h5">Dashboard</Typography>
        </Grid>
        <Grid item>
          <IconButton size="small">
            <RefreshIcon onClick={() => childRef.current.handleRefresh()} />
          </IconButton>
        </Grid>
        <Grid item>
          <Button onClick={() => toast.success("success")}>Toastify</Button>
        </Grid>
      </Grid>
      <GraphComponent />
      <GitCommitHistory
        ref={childRef}
        username="shiv1805"
        repoName="react-vite-project"
      />
    </div>
  );
}
