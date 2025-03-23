import { Box } from "@mui/material";
import React from "react";
import Logo from "../logo/Logo";
import LogoIcon from "../logo/LogoIcon";

export default function LeftNavBar() {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <LogoIcon />
      <Logo />
    </Box>
  );
}
