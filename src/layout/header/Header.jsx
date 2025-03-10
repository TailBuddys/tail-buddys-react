import { Paper, Typography } from "@mui/material";
import React from "react";
// import NavBar from "./topNavBar/NavBar";

export default function Header() {
  // return <NavBar />;
  return (
    <Paper
      elevation={3}
      sx={{
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        height: 80,
      }}
    >
      <Typography>Tailbuddys 🐕</Typography>
    </Paper>
  );
}
