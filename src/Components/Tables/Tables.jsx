import React from "react";
import { toast } from "react-toastify";

import { Button, Grid, Typography } from "@mui/material";

export default function Tables() {
  return (
    <div>
      <Grid container columnGap={1}>
        <Grid item>
          <Typography variant="h5">Tables</Typography>
        </Grid>
        <Grid item>
          <Button onClick={() => toast.success("success")}>Toastify</Button>
        </Grid>
      </Grid>
    </div>
  );
}
