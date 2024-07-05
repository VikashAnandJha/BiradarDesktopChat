import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { TextField } from "@mui/material";

export default function SearchComponent() {
  return (
    <Paper
      sx={{ p: "10", display: "flex", alignItems: "center" }}
      style={{ padding: 10 }}
    >
      <TextField
        placeholder="Enter email id to search"
        fullWidth
        hiddenLabel
        size="small"
      />{" "}
      <IconButton color="primary" sx={{ p: "10px" }} aria-label="directions">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
