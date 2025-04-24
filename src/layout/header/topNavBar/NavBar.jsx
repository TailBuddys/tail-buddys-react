import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import { AppBar, Toolbar } from "@mui/material";
import RightNavBar from "./right-navigation/RightNavBar";

export default function NavBar() {
  return (
    <AppBar
      position="sticky"
      elevation={10}
      sx={{ height: "50px", backgroundColor: "var(--accent)" }}
    >
      <Toolbar sx={{ justifyContent: "space-between", pb: 2 }}>
        <LeftNavBar />
        <RightNavBar />
      </Toolbar>
    </AppBar>
  );
}
