import React from "react";
import { string, func } from "prop-types";
import NavBarLink from "./NavBarLink";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "../../providers/CustomThemeProvider";
import { makeFirstLetterCapital } from "../../forms/utils/algoMethods";

const MenuLink = ({ text, navigateTo, onClick, styles }) => {
  const { isDark } = useTheme();
  return (
    <NavBarLink to={navigateTo}>
      <MenuItem
        sx={{ ...styles, color: isDark ? "white" : "black" }}
        onClick={onClick}
      >
        {makeFirstLetterCapital(text)}
      </MenuItem>
    </NavBarLink>
  );
};

MenuLink.propTypes = {
  navigateTo: string.isRequired,
  onClick: func.isRequired,
  text: string.isRequired,
};

MenuLink.defaultProps = {
  styles: {},
};

export default MenuLink;
