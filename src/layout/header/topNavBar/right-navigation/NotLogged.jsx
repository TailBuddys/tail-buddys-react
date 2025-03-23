import React from "react";
import Box from "@mui/material/Box";
import ROUTES from "../../../../routes/routesModel";
import NavItem from "../../../../routes/components/NavItem";

const NotLogged = () => {
  return (
    <Box>
      <NavItem to={ROUTES.SIGNUP} lable="signup" />
      <NavItem to={ROUTES.LOGIN} lable="login" />
    </Box>
  );
};

export default NotLogged;
