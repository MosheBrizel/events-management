import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export default function Search() {
  return (
    <Box >
      <Box
        display={"flex"}
        justifyContent={'center'}
        alignItems={'center'}
        component="form"
        sx={{
          color: "blue.main",
          width: "15vw",
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          background: "white",
          border: "1px solid",
          borderRadius: "10px",
        }}
      >
        <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1, color: "blue.main" }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
        />
        <IconButton
          type="button"
          sx={{ p: "1px", color: "blue.main" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
