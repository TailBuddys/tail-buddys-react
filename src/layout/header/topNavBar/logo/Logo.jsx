import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import NavBarLink from "../../../../routes/components/NavBarLink";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../../routes/components/NavItem";

export default function Logo() {
  const isMobile = useMediaQuery("(max-width:1025px)");

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
      {isMobile && <NavItem to={ROUTES.ABOUT} lable="More About Us" />}
    </NavBarLink>
  );
}
