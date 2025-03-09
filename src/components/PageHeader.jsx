import { Box, Divider, Typography } from "@mui/material";
import React from "react";

export default function PageHeader({ title, subtitle }) {
  return (
    <Box>
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      <Typography variant="h5" component="h2">
        {subtitle}
      </Typography>
      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
