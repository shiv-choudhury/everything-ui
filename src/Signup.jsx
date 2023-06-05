import { Button, Grid, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import "./authpage.scss";

export default function Signup() {
  return (
    <div className="auth-div">
      <div className="auth-card">
        <Grid container rowGap={3}>
          <Grid item xs={12}>
            <div className="auth-title">Create An Account</div>
            <div className="auth-subtitle">
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>User Name</InputLabel>
            <TextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>E-mail</InputLabel>
            <TextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Password</InputLabel>
            <TextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Signup
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
