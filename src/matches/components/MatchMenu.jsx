import React from "react";
import MuiMenu from "@mui/material/Menu";
import { Box, Button } from "@mui/material";
import { useAlert } from "../../providers/AlertProvider";
import { useUser } from "../../users/providers/UserProvider";

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
        <>
          {/* <MenuLink  למידה ונצטרך בהמשך
            text="Edit Dog"
            navigateTo={ROUTES.EDIT_DOG}
            onClick={onClose}
          /> */}

          <Button
            onClick={() => {
              onClose();
              createChat();
            }}
          >
            Create chat with {match.receiverDogName}
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
            Unmatch {match.receiverDogName}
          </Button>
        </>
      </Box>
    </MuiMenu>
  );
}

export default MatchMenu;
