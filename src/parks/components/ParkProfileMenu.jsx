import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";
import MenuLink from "../../routes/components/MenuLink";
import ROUTES from "../../routes/routesModel";
import { useAlert } from "../../providers/AlertProvider";
import useParks from "../hooks/useParks";

function ParkProfileMenu({ isOpen, anchorEl, onClose, data }) {
  const { alertActivation } = useAlert();
  const { handleDeletePark } = useParks();

  const confirmDelete = () => {
    handleDeletePark(data.id);
  };
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
            text="Edit Park"
            navigateTo={`${ROUTES.EDIT_PARK}/${data.id}`}
            onClick={onClose}
          />
          <Button
            onClick={() => {
              onClose();
              alertActivation(
                "error",
                "Delete Confirmation",
                "Are you sure you want to delete this park?",
                confirmDelete
              );
            }}
            sx={{ color: "red" }}
          >
            Delete This Park
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default ParkProfileMenu;
