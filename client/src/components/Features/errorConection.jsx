import React from 'react'
import ComputerIcon from '@mui/icons-material/Computer';
import StorageIcon from '@mui/icons-material/Storage';
import CloseIcon from '@mui/icons-material/Close';
import theme from "../../theme";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Grow from '@mui/material/Grow';
import Typography from "@mui/material/Typography";

export default function ErrorConection() {
  return (
    <ThemeProvider theme={theme}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"150px"}}>
        <Typography
                component="h1"
                variant="h3"
                sx={{
                  color: "text.main",
                }}
              >
                conection error
              </Typography>
    </div>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:"120px"}}>
    <ComputerIcon
    color='text'
    sx={{fontSize:'100px'}}
    />
    <Box sx={{ width: '40%' }} margin={'20px'}>
        <div style={{position: 'relative'}}>
     <LinearProgress color='text' sx={{ zIndex: '1'}}/>
     <Grow 
        in={true} 
        timeout={5000}
      >
        <CloseIcon
        color='error' 
          style={{
            position: 'absolute',
            top: -48,
            left: 200, 
            fontSize: '100px',
            zIndex: 2
          }}
        />
      </Grow>

     </div>
    </Box>
    <StorageIcon
    color='text'
    sx={{fontSize:'100px'}}
    />
    </div>
    </ThemeProvider>
  )
}
