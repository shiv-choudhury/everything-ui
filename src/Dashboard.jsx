import {
  AppBar,
  Button,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [drawerState, setDrawerState] = useState(false);

  return (
    <div>
      <CssBaseline />
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
          <Button onClick={() => navigate("/login")} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* <Toolbar /> */}
      <Drawer variant="persistent" anchor="left" open={drawerState}>
        <Toolbar />
        <div style={{ padding: 16, background: "#D9F0FF" }}>
          <div style={{ padding: 16 }}>Menu</div>
          <List>
            <ListItem>Item1</ListItem>
            <ListItem>Item1</ListItem>
            <ListItem>Item1</ListItem>
            <ListItem>Item1</ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
