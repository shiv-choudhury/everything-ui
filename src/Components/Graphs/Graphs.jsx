import React from "react";

import { Grid, IconButton, Typography } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";

import { BarGraph, GraphComponent } from "./GraphComponent";

export default function Graphs() {
  return (
    <div>
      <Grid container columnGap={1}>
        <Grid item>
          <Typography variant="h5">Graphs</Typography>
        </Grid>
        <Grid item>
          <IconButton aria-label="delete" size="small">
            <RefreshIcon />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container rowGap={1}>
        <Grid item md={6}>
          <GraphComponent />
        </Grid>
        <Grid item md={6}>
          <BarGraph />
        </Grid>
      </Grid>
    </div>
  );
}
