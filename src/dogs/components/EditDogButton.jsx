import { Fab, Tooltip, Zoom } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function EditDogButton() {
  const navigate = useNavigate();

  return (
    <Tooltip title="Edit Dog" TransitionComponent={Zoom} placement="left" arrow>
      <Fab
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: 75,
          right: 16,
        }}
        onClick={() => {
          navigate(ROUTES.EDIT_DOG);
        }}
      >
        <ModeEditIcon />
      </Fab>
    </Tooltip>
  );
}
