import {
  AppBar,
  Button,
  CircularProgress,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// import useAppContext from "../Context/AppContext";

const Header = ({ setDrawerState, drawerState }) => {
  const navigate = useNavigate();
  // const { userState, dispatch } = useAppContext();
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } =
    useAuth0();
  console.log("--->", user, isAuthenticated, isLoading);
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <IconButton
          onClick={() => setDrawerState(!drawerState)}
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My Vite Project
        </Typography>

        {!isAuthenticated && isLoading ? (
          <CircularProgress sx={{ color: "white", marginLeft: 1 }} size={30} />
        ) : (
          <>
            <img
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "50%",
                marginRight: 10
              }}
              src={user?.picture}
              alt="profile picture"
            />
            <Typography>Welcome {user?.name}!</Typography>
            <Button
              style={{ marginLeft: 10 }}
              variant="outlined"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              color="inherit"
            >
              Logout
            </Button>
          </>
        )}
        {/* <Button
          style={{ marginLeft: 10 }}
          variant="outlined"
          onClick={() => navigate("/login")}
          color="inherit"
        >
          App Logout
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
