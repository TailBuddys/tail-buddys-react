import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";
import { useAlert } from "../../providers/AlertProvider";
import { useUser } from "../../users/providers/UserProvider";

function ChatMenu(isOpen, anchorEl, onClose, handleUnmatch, chat) {
  const { alertActivation } = useAlert();
  const { loginDog } = useUser();

  const confirmUnmatch = () => {
    // handleUnmatch(match.id, loginDog, match.receiverDogId, false);
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
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Move {} to archive
          </Button>
          <Button
            onClick={() => {
              onClose();
              alertActivation(
                "error",
                "Unmatch Confirmation",
                `Are you sure you want unmatch relation with {the chat}?`,
                confirmUnmatch
              );
            }}
            sx={{ color: "red" }}
          >
            Unmatch {}
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default ChatMenu;
