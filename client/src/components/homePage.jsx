import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import theme
 from "../theme";



function Home(props) {
 
  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          backgroundColor: "darkblue.main",
          borderRadius: "10px",
          color: "white.main",
          ".MuiInputLabel-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline": {
            color: "inherit",
            borderColor: "currentColor",
          },
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4, 
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

          }}
        >
          <img
            src="\logo\logo.png"
            alt="Logo"
            style={{ width: "2000px", height: "200px", marginBottom: "16px" }}
          />
          </Box>
          <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
{/* השארתי בהערה למקרה שירצו לעשות כותרת */}
          {/* <Typography
            component="h1"
            variant="h2"
            sx={{
              color: "yelow.main",
              textAlign: "center",
              fontSize:'50px'
            }}
          >
            mego project {props.companyName}
          </Typography> */}
          <Typography
            variant="body2" 
            sx={{
              color: "yelow.main",
              textAlign: "center",
              marginTop: 2,
              fontSize:'30px',
              fontFamily: "-moz-initial",
              fontStyle: "italic",
              textAlign: "left",
              marginRight: 5,

 
            }}
          >
            A system for managing tasks, tracking them and interaction between employees
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}
          >
            <Link to=".\login" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ flex: 1, marginRight: 1}}
                color="yelow"
              >
                Log In
              </Button>
            </Link>
          
            <Link to="./signup" style={{ textDecoration: "none" }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ flex: 1, marginLeft: 1}}
                color="yelow"
              >
                Sign up
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home;
