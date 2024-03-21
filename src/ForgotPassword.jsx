import { Button, Grid, InputLabel, TextField } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="auth-div">
      <div className="auth-card">
        <Grid container rowGap={3}>
          <Grid item xs={12}>
            <div className="auth-title">Forgot your password?</div>
            <div className="auth-subtitle">
              Please enter your email address below and we will send you a link
              to reset your password.
            </div>
          </Grid>

          <Grid item xs={12}>
            <InputLabel>E-mail</InputLabel>
            <TextField variant="outlined" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <div style={{ color: "black" }}>
              Go back to <Link to="/signup">Signup</Link> or{" "}
              <Link to="/login">Login</Link> page
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
