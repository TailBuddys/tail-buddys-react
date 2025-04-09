import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box } from "@mui/material";
import MenuLink from "../../routes/components/MenuLink";
import ROUTES from "../../routes/routesModel";

function DogProfileMenu({ isOpen, anchorEl, onClose }) {
  return (
    <MuiMenu
      open={isOpen}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          sx: {
            mt: "25px",
          },
        },
      }}
    >
      <Box>
        <>
          <MenuLink
            text="Edit Dog"
            navigateTo={ROUTES.EDIT_DOG}
            onClick={onClose}
          />
          <MenuLink
            text="Dog Preferences"
            navigateTo={ROUTES.EDIT_DOG} // פילטר
            onClick={onClose}
          />
          <MenuLink
            text="Delete Dog"
            navigateTo={ROUTES.EDIT_DOG} // מחיקה
            onClick={onClose}
          />
        </>
      </Box>
    </MuiMenu>
  );
}

export default DogProfileMenu;
