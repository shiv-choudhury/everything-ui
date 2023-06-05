import { Button, Grid, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="auth-div">
      <div className="auth-card">
        <Grid container rowGap={3}>
          <Grid item xs={12}>
            <div className="auth-title">Login to Continue</div>
            <div className="auth-subtitle">
              Don't have an account?{" "}
              <Link to="/signup">Create new account</Link>
            </div>
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
            <Link to="/forgot_password">Forgot Password?</Link>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => navigate("/")} fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
