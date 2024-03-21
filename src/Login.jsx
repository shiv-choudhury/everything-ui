import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import { VisibilityOff } from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const LoginDetails = {
    email: "shiv@gmail.com",
    password: "shiv123"
  };

  const handleSubmit = () => {
    console.log(email, password);
    if (email === LoginDetails.email && password === LoginDetails.password) {
      handleClick();
      navigate("/");
    }
  };

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
            <OutlinedInput
              value={email}
              placeholder={LoginDetails.email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              placeholder={LoginDetails.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Link to="/forgot_password">Forgot Password?</Link>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              onClick={() => handleSubmit()}
              fullWidth
            >
              Login
            </Button>
            <Snackbar
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Login successful"
              // action={action}
            />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
