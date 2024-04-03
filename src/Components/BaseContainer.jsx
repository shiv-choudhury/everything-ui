import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TableChartIcon from "@mui/icons-material/TableChart";
import { styled } from "@mui/material/styles";

import Header from "./Header";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function BaseContainer(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [drawerState, setDrawerState] = useState(true);

  const menuList = [
    {
      name: "Dashboard",
      path: "/",
      icon: <DashboardIcon />
    },
    {
      name: "Graphs",
      path: "/graphs",
      icon: <BarChartIcon />
    },
    {
      name: "Tables",
      path: "/tables",
      icon: <TableChartIcon />
    },
    {
      name: "Todo List",
      path: "/todolist",
      icon: <PlaylistAddCheckIcon />
    },
    {
      name: "Forms",
      path: "/forms",
      icon: <FormatAlignCenterIcon />
    }
  ];

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Header setDrawerState={setDrawerState} drawerState={drawerState} />
        <Divider />
        <Drawer variant="permanent" open={drawerState}>
          <Toolbar />
          <Box>
            <List>
              <ListItem disablePadding sx={{ display: "block" }}>
                {menuList.map((item) => (
                  <ListItemButton
                    key={item.name}
                    className={
                      pathname === item.path ? "menu-active" : "menu-btn"
                    }
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <div>{props.children}</div>
        </Box>
      </Box>
    </div>
  );
}
