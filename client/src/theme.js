import { createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    error: {
      main: red.A400,
    },
    green: {
      main: "rgba(44, 177, 88, 0.632)",
    },
    white: {
      main: "#fff",
    },
    borderColor: {
      primary: "#fff", // Set the text color to white
    },
    text: {
      primary: "#424244",
      main: "#424244",
    },
    green: {
      primary: "#008000",
    },
    black: {
      main: "#000000",
    },
    blue: {
      main: "#275FC1",
    },
    gray: {
      main: "#EAEDE9",
    },
    blue: {
      main: "#1976d2",
    },
  },
});

export default theme;
