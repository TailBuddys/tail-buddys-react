import { Box } from "@mui/material";
import React from "react";
import { useTheme } from "../../providers/CustomThemeProvider";

export default function Main({ children }) {
  const { isDark } = useTheme();

  return (
    <Box
      sx={{
        minHeight: "86.5vh",
        padding: "5px",
        backgroundColor: isDark ? "#333333" : "#fff8ee",
        color: isDark ? "white" : "black",
        textAlign: "center",
      }}
    >
      {children}
    </Box>
  );
}
