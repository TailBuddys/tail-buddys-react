import { Paper, useMediaQuery } from "@mui/material";
import React from "react";
import "../../styles/general.css";
import ROUTES from "../../routes/routesModel";
import NavItem from "../../routes/components/NavItem";

export default function Footer() {
  const isMobile = useMediaQuery("(max-width:1025px)");

  if (isMobile) return null;

  return (
    <Paper elevation={3} className="footer-container">
      <div className="footer-slider">
        <span className="footer-text">All rights reserved©</span>
        <NavItem to={ROUTES.ABOUT} lable="About" />
      </div>
    </Paper>
  );
}
