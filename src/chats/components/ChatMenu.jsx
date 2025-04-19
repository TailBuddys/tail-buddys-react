import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";
import { useAlert } from "../../providers/AlertProvider";

function ChatMenu({ isOpen, anchorEl, onClose, chat, handleDeleteChat }) {
  const { alertActivation } = useAlert();

  const confirmDeleteChat = () => {
    handleDeleteChat(chat.id);
  };

  return (
    <MuiMenu
      open={isOpen}
      onClose={(e) => {
        e?.stopPropagation?.();
        onClose();
      }}
      onClick={(e) => e.stopPropagation()}
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
                "Delete Confirmation",
                `Are you sure you want delete chat with ${chat.dogName}?`,
                confirmDeleteChat
              );
            }}
            sx={{ color: "red" }}
          >
            Delete Chat
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default ChatMenu;
