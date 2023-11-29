import * as React from 'react';
import { useState, useEffect } from "react";
import { styled, useTheme } from '@mui/material/styles';
import { Outlet, NavLink } from "react-router-dom";
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Grid} from "@mui/material";
import Search from "./Search.jsx";
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
import {
    Dashboard,
    Work,
    Assessment,
    PersonAdd,
    Chat,
    Settings,
    Info,
  } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MobileDashboard() {
    const [selectedButton, setSelectedButton] = useState("");
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    // Update the selected button based on the current route
    switch (location.pathname) {
      case "/":
        setSelectedButton("Dashboard");
        break;
      case "/Specs":
        setSelectedButton("Specs");
        break;
      case "/Board":
        setSelectedButton("Board");
        break;
      case "/Add User":
        setSelectedButton("Add User");
        break;
      case "/Messages":
        setSelectedButton("Messages");
        break;
      case "/Settings":
        setSelectedButton("Settings");
        break;
      case "/Info":
        setSelectedButton("Info");
        break;
      default:
        setSelectedButton("Dashboard");
    }
  }, [location]);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:"verydarkblue.main"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
                // backgroundColor:"yelow.main",
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Search />
          <AccountCircleSharpIcon sx={{marginLeft:'10%'}}/>


        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to="/" style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
              onClick={() => handleButtonClick('Dashboard')}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Dashboard color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to='Specs' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
              onClick={() => handleButtonClick("Specs")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Work color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Specs" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to='Board' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
               onClick={() => handleButtonClick("Board")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Assessment color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Board" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to='AddUser' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
              onClick={() => handleButtonClick("AddUser")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <PersonAdd color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Add User" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to='Messages' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
               onClick={() => handleButtonClick("Messages")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                 <Chat color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Messages" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding sx={{ display: 'block' }}>
            <NavLink to='Settings' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
              onClick={() => handleButtonClick("Settings")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Settings color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Settings" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>

            <ListItem  disablePadding sx={{ display: 'block' }}>
            <NavLink to='Info' style={{color: '#F6C927', textDecoration: 'none'}}>
              <ListItemButton
              onClick={() => handleButtonClick("Info")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Info color="yelow"/>
                </ListItemIcon>
                <ListItemText primary="Info" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
              </NavLink>
            </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Grid item xs={5} sx={{color:"#f6c927", fontSize:"25px"}}>
              {selectedButton}
            </Grid>
          <Outlet />
      </Box>
    </Box>
  );
}