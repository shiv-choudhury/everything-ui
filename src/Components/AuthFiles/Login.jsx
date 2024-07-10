import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import { VisibilityOff } from "@mui/icons-material";
import Visibility from "@mui/icons-material/Visibility";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Snackbar from "@mui/material/Snackbar";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/" />;
  }

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
        <div className="auth-subtitle" style={{ color: "red" }}>
          <InfoOutlinedIcon
            style={{ fontSize: 15, marginRight: 5, marginBottom: -2 }}
          />
          Use Google for Signup/Login
        </div>

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
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              placeholder="******"
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
            <Box className="center" my={2}>
              <Typography>Or</Typography>
            </Box>
            <Button
              variant="contained"
              onClick={() => loginWithRedirect()}
              fullWidth
              style={{ backgroundColor: "#0791ff" }}
            >
              Signup/Login with Google
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
