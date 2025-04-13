import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";
import MenuLink from "../../routes/components/MenuLink";
import ROUTES from "../../routes/routesModel";
import { useAlert } from "../../providers/AlertProvider";
import useDogs from "../hooks/useDogs";

function DogProfileMenu({ isOpen, anchorEl, onClose }) {
  const { alertActivation } = useAlert();
  const { handleDeleteDog } = useDogs();

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
          <Button
            onClick={() => {
              onClose();
              alertActivation(
                "error",
                "Delete Confirmation",
                "Are you sure you want to delete this dog?",
                handleDeleteDog
              );
            }}
            sx={{ color: "red" }}
          >
            Delete Dog
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default DogProfileMenu;
