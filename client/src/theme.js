import { createTheme } from "@mui/material/styles";
import { green, red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    
    error: {
      main: red.A400,
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
    blue:{
      main:"#275FC1"
    }
  },
});

export default theme;
