import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatMenu from "./ChatMenu";

function ChatItemComponent({ chat, handleDeleteChat, chatClick }) {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [screenSize]);
  return (
    <Box
      onClick={() => chatClick?.()}
      sx={{
        display: "flex",
        padding: "12px 16px",
        alignItems: "flex-start",
        gap: "12px",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      <Avatar src={chat.dogImageUrl} alt={chat.dogName} />
      <Box
        sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            width: "100%",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              textAlign: "left",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              pr: 1,
            }}
          >
            {chat.dogName}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "4px",
            }}
          >
            <IconButton
              size="small"
              sx={{ p: 0 }}
              onClick={(event) => {
                event.stopPropagation();
                setAnchor(event.currentTarget);
                setMenuOpen(true);
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {chat.lastMessage && (
                <>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "rgba(0, 0, 0, 0.7)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "100%",
                      mr: 8,
                    }}
                  >
                    {chat.lastMessage}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                  >
                    {chat.time}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* <Typography
          variant="body2"
          sx={{
            color: "rgba(0, 0, 0, 0.7)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            pb: 0,
          }}
        >
          {chat.messages[chat.messages.length - 1]?.text}
        </Typography> */}

        {/* <Typography
          variant="caption"
          sx={{
            color: "rgba(0, 0, 0, 0.4)",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {chat.headline}
        </Typography> */}
      </Box>

      <ChatMenu
        anchorEl={anchorEL}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        handleDeleteChat={handleDeleteChat}
        chat={chat}
      />
    </Box>
  );
}

export default ChatItemComponent;
