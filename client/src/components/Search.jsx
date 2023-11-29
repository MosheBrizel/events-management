import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

import IconButton from "@mui/material/IconButton";

import SearchIcon from "@mui/icons-material/Search";

export default function Search() {
  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        background: "#121231",
      }}
    >
      <IconButton sx={{ p: "10px" }} aria-label="menu"></IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1, color: "#FFFFFF" }}
        placeholder="Search"
        inputProps={{ "aria-label": "search google maps" }}
      />
      <IconButton
        type="button"
        sx={{ p: "1px", color: "#FFFFFF" }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
