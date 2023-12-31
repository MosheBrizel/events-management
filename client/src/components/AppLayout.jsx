import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import {
  Avatar,
  Container,
  Grid,
  InputBase,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
} from "@mui/material";
import { useToken, useUserInfo } from "../atoms/atomsFile";
import Search from "./Search.jsx";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

export default function AppLayout() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, setUser] = useUserInfo();
  const [token, setToken] = useToken();

  const handleLogout = () => {
    setToken(false);
    localStorage.removeItem("user");
    localStorage.removeItem("jsonwebtoken");
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
              <Box height={'100px'}></Box>

      <AppBar position="fixed" color="white">
        <Toolbar sx={{flexDirection:"row", justifyContent: 'space-between', alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src="/levent.png"
              alt=""
              style={{ height: "30px", marginRight: "10px" }}
            />
          </Box>

          <Search />

          <Box
            sx={{  display: "flex", alignItems: "center" }}
          >
            {!token ? (
              <NavLink to={"SignIn"} color="blue" sx={{ color: "blue" }}>
                <Button
                  to={"SignIn"}
                  color="inherit"
                  sx={{ border: "1px solid" }}
                >
                  Login
                </Button>
              </NavLink>
            ) : (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, marginRight: "10px" }}
                  >
                    <Avatar alt="Remy Sharp" src={user.image} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/registeredEvents")}
                    >
                      registered events
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/CreateEvent")}
                    >
                      Create your one Event
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/")}
                    >
                      Home page
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={handleLogout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
      <Box
        width={"100%"}
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        alignItems={"center"}
      >
        <Button
          onClick={() => navigate("/")}
          sx={{
            margin: "50px",
            border: "1px solid",
          }}
        >
          back to home page
        </Button>
      </Box>
    </Box>
  );
}
