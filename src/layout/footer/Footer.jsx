import { Paper, Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <Paper
      elevation={3}
      sx={{ position: "sticky", bottom: 0, left: 0, right: 0, zIndex: 1 }}
    >
      <Typography>All rights reserved©</Typography>
    </Paper>
  );
}
