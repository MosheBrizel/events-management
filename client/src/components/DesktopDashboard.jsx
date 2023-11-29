import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "./AppLayout.css";
import Search from "./Search.jsx";
import ProfileCard from "./ProfileCard.jsx";
import { Grid, Button, Box, Stack } from "@mui/material";
import {
  Dashboard,
  Work,
  Assessment,
  PersonAdd,
  Chat,
  Settings,
  Info,
} from "@mui/icons-material";

export default function DesktopDashboard() {
  const [selectedButton, setSelectedButton] = useState(""); // Initialize the first button as selected

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
  };

  return (
    <Grid container className="app-layout">
      <Grid item xs={2} className="sidebar" position="fixed" zIndex='4'>
        <Stack
          direction="column"
          justifyContent="space-between"
          alignItems="center"
          height="100%"
          spacing={10}
        >
          <Box>
            <NavLink to="/">
              <Button
                startIcon={<Dashboard />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Dashboard" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Dashboard")}
              >
                Dashboard
              </Button>
            </NavLink>
            <NavLink to="Specs">
              <Button
                startIcon={<Work />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Specs" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Specs")}
              >
                Specs
              </Button>
            </NavLink>
            <NavLink to="Board">
              <Button
                startIcon={<Assessment />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Board" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Board")}
              >
                Board
              </Button>
            </NavLink>
            <NavLink to="Add User">
              <Button
                startIcon={<PersonAdd />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "AddUser" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("AddUser")}
              >
                Add User
              </Button>
            </NavLink>
            <NavLink to="Messages">
              <Button
                startIcon={<Chat />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Messages" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Messages")}
              >
                Messages
              </Button>
            </NavLink>
          </Box>
          <Box>
            <NavLink to="Settings">
              <Button
                startIcon={<Settings />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Settings" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Settings")}
              >
                Settings
              </Button>
            </NavLink>
            <NavLink to="Info">
              <Button
                startIcon={<Info />}
                fullWidth
                className={`nav-button ${
                  selectedButton === "Info" ? "selected" : ""
                }`}
                onClick={() => handleButtonClick("Info")}
              >
                Info
              </Button>
            </NavLink>
          </Box>
        </Stack>
      </Grid>

      <Grid item xs={2} className="sidebar"></Grid>

      
        <main>
          <Grid
            item xs={10}
            container
            spacing={3}
            alignItems="center"
            sx={{ padding: "15px", backgroundColor:'verydarkblue.main'}}
            position='fixed'
            
          >
            <Grid item xs={3} sx={{color:"#f6c927", fontSize:"25px"}}>
              {selectedButton}
            </Grid>
            <Grid item xs={4}>
              <Search />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={3}>
              <ProfileCard
                isOnline={true}
                notifications={true}
                numMessages={3}
              />
            </Grid>
          </Grid>
          </main>
          <Grid item xs={10} sx={{marginTop: '100px'}}>
          <Outlet />
        
      </Grid>
    </Grid>
  );
}
