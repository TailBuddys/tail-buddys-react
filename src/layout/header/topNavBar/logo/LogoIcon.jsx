import { Avatar, IconButton } from "@mui/material";
import React from "react";
import ROUTES from "../../../../routes/routesModel";
import NavBarLink from "../../../../routes/components/NavBarLink";

export default function LogoIcon() {
  return (
    <NavBarLink to={ROUTES.ROOT}>
      <IconButton>
        <Avatar
          alt="TailBuddys icon"
          src="\assets\images\tailBuddysLogo.jpg"
          sx={{ border: "2px solid #DDEBF6", width: 40, height: 40 }}
        />
      </IconButton>
    </NavBarLink>
  );
}
