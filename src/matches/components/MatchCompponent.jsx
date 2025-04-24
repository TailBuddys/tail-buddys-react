import React, { useEffect, useState } from "react";
import { styled, useTheme as useMuiTheme } from "@mui/material/styles";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Tooltip,
  useMediaQuery,
  Zoom,
} from "@mui/material";
import MatchMenu from "./MatchMenu";

const MatchCompponent = ({
  handleUnmatch,
  handleCreateChat,
  match,
  notifications,
}) => {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);

  useEffect(() => {
    setIsOpen(false);
  }, [screenSize]);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "red",
      color: "red",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <Box sx={{ pt: 1, pb: 2 }}>
      <Tooltip
        title={`Match with ${match.receiverDogName}`}
        slots={{
          transition: Zoom,
        }}
        arrow
      >
        <IconButton
          sx={{ p: 0, display: "inline-flex", marginLeft: 2 }}
          onClick={(event) => {
            setAnchor(event.currentTarget);
            setIsOpen(true);
          }}
        >
          {notifications.includes(match.id) ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Box
                  sx={{
                    display: "inline-block",
                    borderRadius: "50%",
                    padding: "3px",
                    background:
                      "linear-gradient(135deg, var(--secondary), var(--primary))",
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "50%",
                      backgroundColor: "var(--varodi)",
                      padding: "2px",
                    }}
                  >
                    <Avatar
                      sx={{ width: 56, height: 56 }}
                      alt="dog avatar"
                      src={match.receiverDogImage}
                    />
                  </Box>
                </Box>
                <Box
                  component="img"
                  src="/assets/images/itsAMatchIcon.png"
                  alt="overlay"
                  sx={{
                    width: 70,
                    height: 50,
                    position: "absolute",
                    bottom: -15,
                    left: "45%",
                    transform: "translateX(-50%)",
                  }}
                />
              </Box>
            </StyledBadge>
          ) : (
            <Box
              sx={{
                display: "inline-block",
                borderRadius: "50%",
                padding: "3px",
                background:
                  "linear-gradient(135deg, var(--secondary), var(--primary))",
              }}
            >
              <Box
                sx={{
                  borderRadius: "50%",
                  backgroundColor: "var(--varodi)",
                  padding: "2px",
                }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                  }}
                  alt={"dog avatar"}
                  src={match.receiverDogImage}
                />
              </Box>
            </Box>
          )}
        </IconButton>
      </Tooltip>
      <MatchMenu
        handleCreateChat={handleCreateChat}
        handleUnmatch={handleUnmatch}
        match={match}
        anchorEl={anchorEL}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </Box>
  );
};

export default MatchCompponent;
