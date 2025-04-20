import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useAlert } from "../../providers/AlertProvider";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import { useNavigate } from "react-router-dom";

function MatchMenu({
  isOpen,
  anchorEl,
  onClose,
  handleUnmatch,
  match,
  handleCreateChat,
}) {
  const { alertActivation } = useAlert();
  const { loginDog } = useUser();
  const navigate = useNavigate();

  const confirmUnmatch = () => {
    handleUnmatch(match.id, loginDog, match.receiverDogId, false);
  };

  const createChat = () => {
    handleCreateChat(loginDog, match.receiverDogId);
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography sx={{ textAlign: "center" }}>
          {match.receiverDogName}
        </Typography>
        <Divider variant="middle" />
        <>
          <Button
            onClick={() => {
              onClose();
              navigate(ROUTES.DOG_PROFILE, { state: { match } });
            }}
          >
            Go to profile
          </Button>
          <Button
            onClick={() => {
              onClose();
              createChat();
            }}
          >
            Create chat
          </Button>
          <Button
            onClick={() => {
              onClose();
              alertActivation(
                "error",
                "Unmatch Confirmation",
                `Are you sure you want unmatch relation with ${match.receiverDogName}?`,
                confirmUnmatch
              );
            }}
            sx={{ color: "red" }}
          >
            Unmatch
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default MatchMenu;
