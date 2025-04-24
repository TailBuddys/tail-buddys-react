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

function ChatItemComponent({
  chat,
  handleDeleteChat,
  chatClick,
  chatNotifications,
  handleUpdateChat,
}) {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);
  const [unreadMessageCount, setUnreadMessageCount] = useState();

  useEffect(() => {}, [screenSize]);

  useEffect(() => {
    if (chatNotifications.length > 0 && chat) {
      const chatNotify = chatNotifications.find((c) => c.chatId === chat.id);
      if (chatNotify) {
        setUnreadMessageCount(chatNotify.unreadCount + 1);
      }
    }
  }, [chatNotifications, chat]);

  return (
    <Box
      onClick={() => chatClick?.()}
      sx={{
        display: "flex",
        padding: "12px 16px",
        mb: "24px",
        borderRadius: "10px",
        alignItems: "flex-start",
        gap: "12px",
        cursor: "pointer",
        backgroundColor: "#c9b59d",
        "&:hover": {
          backgroundColor: "#e6d6c3",
        },
      }}
    >
      <Avatar src={chat.dogImageUrl} alt={chat.dogName} />
      <Box sx={{ flex: 1, minWidth: 0, position: "relative" }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            textAlign: "left",
            mb: 0.5,
          }}
        >
          {chat.dogName}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(0, 0, 0, 0.7)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              flex: 1,
              pr: 2,
            }}
          >
            {chat.lastMessage}
          </Typography>

          {unreadMessageCount ? (
            <Typography
              sx={{
                backgroundColor: "#e88536",
                borderRadius: 50,
                fontSize: "80%",
                fontWeight: 700,
                width: "20px",
                height: "20px",
                mr: 2,
                textAlign: "center",
              }}
            >
              {unreadMessageCount}
            </Typography>
          ) : null}

          <Typography
            variant="caption"
            sx={{ color: "var(--secondary)", fontWeight: 700 }}
          >
            {chat.time}
          </Typography>
        </Box>

        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
          }}
          onClick={(event) => {
            event.stopPropagation();
            setAnchor(event.currentTarget);
            setMenuOpen(true);
          }}
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      <ChatMenu
        anchorEl={anchorEL}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        handleDeleteChat={handleDeleteChat}
        handleUpdateChat={handleUpdateChat}
        chat={chat}
      />
    </Box>
  );
}

export default ChatItemComponent;
