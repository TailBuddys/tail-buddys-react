import { Typography } from "@mui/material";
import React from "react";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";

export default function Logo() {
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <Typography
        variant="h4"
        sx={{
          fontFamily: "fantasy",
          mr: 2,
          color: "#231f19",
          display: { xs: "none", sm: "inline-flex" },
        }}
      >
        TailBuddys
      </Typography>
    </NavBarLink>
  );
}
