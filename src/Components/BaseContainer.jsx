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
  Toolbar,
  Tooltip
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import TableChartIcon from "@mui/icons-material/TableChart";
import InfoIcon from "@mui/icons-material/Info";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

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
      name: "Jira Board",
      path: "/jira",
      icon: <ViewKanbanIcon />
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
    },
    {
      name: "Recipe App",
      path: "/recipe",
      icon: <FastfoodIcon />
    },
    {
      name: "About",
      path: "/about",
      icon: <InfoIcon />
    },
    // {
    //   name: "React Flow",
    //   path: "/reactflow",
    //   icon: <AccountTreeIcon />
    // },
    {
      name: "AI Chat Bot",
      path: "/aichatbot",
      icon: <AutoAwesomeIcon />
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
              {menuList.map((item, i) => (
                <ListItem key={i} disablePadding>
                  <Tooltip title={item.name} placement="right" arrow>
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
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box sx={{ flexGrow: 1, p: 3, height: "100%", width: "100%" }}>
          <Toolbar />
          <Box>{props.children}</Box>
        </Box>
      </Box>
    </div>
  );
}
