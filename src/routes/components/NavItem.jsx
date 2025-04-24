import { Button, Typography } from "@mui/material";
import React from "react";
import NavBarLink from "./NavBarLink";
import { useTheme } from "../../providers/CustomThemeProvider";
import "../../styles/general.css";

export default function NavItem({ to, lable, sx }) {
  const { isDark } = useTheme();
  return (
    <NavBarLink sx={sx} to={to}>
      <Button color="inherit">
        <Typography
          className="headers-typography"
          sx={{ color: isDark ? "white" : "black" }}
        >
          {lable}
        </Typography>
      </Button>
    </NavBarLink>
  );
}
