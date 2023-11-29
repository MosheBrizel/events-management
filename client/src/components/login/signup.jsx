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
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../src/theme";
import { useState, useEffect } from "react";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { GetCode } from "./getCodeByEmail";
import urlPage from "../../../url/urlPath";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import WheelWaiting from "../Features/wheelWaiting";
import { emailUserForgetPassword } from "../../atoms/atomsFile";
import UploadPhoto from "../Features/UploadPhoto";
import ErrorConection from "../Features/errorConection";

import { useAtom } from "jotai";

function Copyright(props) {
  return (
    <Typography variant="body2" align="center" {...props}>
      <Link color="inherit" href="https://mui.com/"></Link>
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp() {
  const [emailAtom, setEmailAtom] = useAtom(emailUserForgetPassword);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [focusedPass, setFocusedPass] = useState(false);
  const [fNameError, setfNameError] = useState("");
  const [lNameError, setlNameError] = useState("");
  const [emailError, setemailError] = useState("");
  const [passLength, setpassLength] = useState(false);
  const [passLowercase, setpassLowercase] = useState(false);
  const [passUppercase, setpassUppercase] = useState(false);
  const [passNumbers, setpassNumbers] = useState(false);
  const [passSpecialChars, setpassSpecialChars] = useState(false);
  const [emailExists, setemailExists] = useState("");
  const [pasError, setPasError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [page, setPage] = useState("signup");
  const [email, setEmail] = useState("");

  function validatePassword(password) {
    setpassLength(password.length >= 8);
    setpassLowercase(/[a-z]/.test(password));
    setpassUppercase(/[A-Z]/.test(password));
    setpassNumbers(/\d/.test(password));
    setpassSpecialChars(/[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password));
    return;
  }
  function validateEmail(email) {
    return !(/@/.test(email) && /[.]/.test(email));
  }
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setEmailAtom(data.get("email"));

    if (
      data.get("email") &&
      data.get("password") &&
      data.get("firstName") &&
      data.get("lastName") &&
      !errorMessage &&
      passLength &&
      passLowercase &&
      passNumbers &&
      passSpecialChars &&
      passUppercase &&
      !validateEmail(data.get("email"))
    ) {
      console.log("yes");
      setWaiting(true);
      try {
        const response = await axios.post(urlPage + "users/signup", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setWaiting(false);
        if (response.status == 200) {
          setPage("code");
        }
      } catch (error) {
        if (error.code == "ERR_NETWORK") {
          setPage("error");
        }
        console.log(error);
        setWaiting(false);
        if (
          error.response.data.errors.msg == "one of the information is error"
        ) {
          setemailExists("emailExists");
        } else if (
          error.response.data.errors.msg == "the email is not verify"
        ) {
          setVerifyEmail(true);
        } else {
          setemailExists("");
          setVerifyEmail(false);
        }
      }
    } else {
      if (!data.get("firstName")) {
        setfNameError("This field is required");
      } else {
        setfNameError("");
      }
      if (!data.get("lastName")) {
        setlNameError("This field is required");
      } else {
        setlNameError("");
      }
      if (!data.get("email")) {
        setemailError("This field is required");
      } else if (validateEmail(data.get("email"))) {
        setemailError("The email address is incorrect");
      } else {
        setemailError("");
      }
      if (!data.get("password")) {
        setPasError("This field is required");
      } else {
        setPasError("");
      }
    }
  };

  

  let linkforgut = null;

  if (emailExists == "emailExists") {
    linkforgut = (
      <>
        <FormHelperText id="standard-weight-helper-text" error="true">
          The email address is already registered in the system,
        </FormHelperText>

        <NavLink to="/forgot" variant="body2" style={{ color: "text" }}>
          Forgot password?
        </NavLink>
      </>
    );
  }

  async function handleVerifyEmail() {
    setWaiting(true);
    try {
      const sendEmailUser = await axios.post(urlPage + "users/email", {
        email: emailAtom,
      });
      setPage("code");
      setWaiting(false);
    } catch (error) {
      setWaiting(false);
      if (error.code == "ERR_NETWORK") {
        setPage("error");
      }
      console.log("new error");
      console.error(error);
    }
  }

  let linkEmailVerification = null;

  if (verifyEmail) {
    linkEmailVerification = (
      <>
        <FormHelperText id="standard-weight-helper-text" error="true">
          You have already registered with this address, you have not completed
          the verification yet.
        </FormHelperText>
        <NavLink
          onClick={handleVerifyEmail}
          variant="body2"
          style={{ color: "text" }}
        >
          to verify the email
        </NavLink>
      </>
    );
  }

  useEffect(() => {
    if (password === confirmPassword) {
      setErrorMessage("");
    } else {
      setErrorMessage("The passwords do not match");
    }
  }, [password, confirmPassword]);

  return (
    <>
      <WheelWaiting open={waiting} />
      {page == "code" && <GetCode email={email} />}
      {page == "error" && <ErrorConection />}
      {page == "signup" && (
        <ThemeProvider theme={theme}>
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="off"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      color="text"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={true}
                    >
                      {fNameError}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="off"
                      color="text"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={true}
                    >
                      {lNameError}
                    </FormHelperText>
                  </Grid>
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
                      error={true}
                    >
                      {emailError}
                    </FormHelperText>
                    {linkforgut}
                    {linkEmailVerification}
                  </Grid>

                  
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                      }}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="black"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="password"
                      autoComplete="off"
                      color="text"
                      onFocus={() => setFocusedPass(true)}
                      onBlur={() => setFocusedPass(false)}
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={true}
                    >
                      {pasError}
                    </FormHelperText>
                    <Collapse timeout={1000} in={focusedPass}>
                      <FormHelperText
                        id="standard-weight-helper-text"
                        sx={{ color: "#008000" }}
                        error={!passUppercase}
                      >
                        • Capital letter
                      </FormHelperText>
                      <FormHelperText
                        id="standard-weight-helper-text"
                        sx={{ color: "#008000" }}
                        error={!passLowercase}
                      >
                        • lower-case letter
                      </FormHelperText>
                      <FormHelperText
                        id="standard-weight-helper-text"
                        sx={{ color: "#008000" }}
                        error={!passSpecialChars}
                      >
                        • Special Chars
                      </FormHelperText>
                      <FormHelperText
                        id="standard-weight-helper-text"
                        sx={{ color: "#008000" }}
                        error={!passLength}
                      >
                        • Minimum 8 characters
                      </FormHelperText>
                      <FormHelperText
                        id="standard-weight-helper-text"
                        sx={{ color: "#008000" }}
                        error={!passNumbers}
                      >
                        • Number
                      </FormHelperText>
                    </Collapse>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                      }}
                      required
                      fullWidth
                      autoComplete="off"
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              color="black"
                            >
                              {showConfirmPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      id="ConfirmPassword"
                      color="text"
                    />
                    <FormHelperText
                      id="standard-weight-helper-text"
                      error={true}
                    >
                      {errorMessage}
                    </FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <UploadPhoto />
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
                  Sign Up
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
                      Already have an account? Sign in
                    </NavLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}
