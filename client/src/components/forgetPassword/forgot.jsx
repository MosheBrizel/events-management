import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useState, useEffect } from "react";
import axios from "axios";
import FormHelperText from "@mui/material/FormHelperText";
import { NavLink } from "react-router-dom";
import GetPassword from "./getPasswordByEmail.jsx";
import urlPage from "../../../url/urlPath.js";
import WheelWaiting from "../Features/wheelWaiting";
import ErrorConection from "../Features/errorConection.jsx";
// import the atom
import { emailUserForgetPassword } from "../../atoms/atomsFile.jsx";
import { useAtom } from "jotai";

function validateEmail(email) {
  return !(/@/.test(email) && /[.]/.test(email));
}

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function Forgot() {
  const [emailError, setemailError] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailCorrect, setIsEmailCorrect] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [emailAtom, setEmailAtom] = useAtom(emailUserForgetPassword);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    setEmailAtom(email);

    if (email) {
      if (validateEmail(email)) {
        setemailError("The email address is incorrect");
      } else {
        setemailError("");
        setWaiting(true);
        try {
          const response = await axios.post(urlPage + "forgetPassword/email", {
            email: email,
          });

          setWaiting(false);
          setIsEmailCorrect(true);
        } catch (error) {
          if (error.code == "ERR_NETWORK") {
            setIsEmailCorrect(null);
          }
          setWaiting(false);
          if (error.response.data.mag == "erorr email not found") {
            setemailError("Email is incorrect");
          }
        }
      }
    }
  };

  return (
    <>
      <WheelWaiting open={waiting} />
      {isEmailCorrect ? (
        <GetPassword />
      ) : isEmailCorrect == false ? (
        <ThemeProvider theme={theme}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="logo/logo.png"
              alt=""
              style={{ width: "422.89px", top: "171.09px", left: "305px" }}
            />
          </div>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
              backgroundColor: "white.main",
              borderRadius: "10px",
              color: "black.main",
              border: "1px solid",

              ".MuiInputLabel-root, .MuiOutlinedInput-root, .MuiOutlinedInput-notchedOutline":
                {
                  color: "inherit",
                  borderColor: "currentColor",
                },
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "text.main" }}>
                <LockOutlinedIcon
                  sx={{
                    fill: "inherit",
                  }}
                />
              </Avatar>
              <Typography
                component="h1"
                variant="h5"
                sx={{
                  color: "text.main",
                }}
              >
                Forgot Password
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="off"
                      color="text"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error="true"
                    >
                      {emailError}
                    </FormHelperText>
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="white"
                  sx={{
                    mt: 3,
                    mb: 2,
                    border: "solid",
                    borderColor: "text.main",
                    color: "text.main",
                    "&:hover": { backgroundColor: "white.main" },
                  }}
                >
                  Sand
                </Button>
                <Grid
                  container
                  sx={{
                    marginBottom: "20px",
                  }}
                  justifyContent="flex-end"
                >
                  <Grid item>
                    <NavLink
                      to="/"
                      variant="body2"
                      style={{ color: "text", textDecoration: "underline" }}
                    >
                      Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      ) : (
        <ErrorConection />
      )}
    </>
  );
}
