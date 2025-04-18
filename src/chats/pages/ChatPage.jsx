import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useTheme as useMuiTheme } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ChatMenu from "../components/ChatMenu";

function ChatPage({ handleUnmatch, chat, handleBackToList }) {
  const theme = useMuiTheme();
  const screenSize = useMediaQuery(theme.breakpoints.up("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEL, setAnchor] = useState(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [screenSize]);

  return (
    <Box
      sx={{
        width: 400,
        height: 600,
        border: "1px solid #ccc",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          borderBottom: "1px solid #ccc",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            sx={{ p: 0, display: "inline-flex", marginLeft: 1 }}
            onClick={handleBackToList}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          <Avatar sx={{ ml: 1, mr: 1 }} />
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            מושיקו{" "}
          </Typography>
        </Box>
        <IconButton
          onClick={(event) => {
            setAnchor(event.currentTarget);
            setMenuOpen(true);
          }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      {/* Chat messages */}
      <Box
        sx={{ flex: 1, overflowY: "auto", p: 1, backgroundColor: "#e5ddd5" }}
      >
        {chat.messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              mb: 1,
            }}
          >
            <Paper
              sx={{
                px: 2,
                py: 1,
                maxWidth: "70%",
                backgroundColor: msg.sender === "me" ? "#dcf8c6" : "#fff",
                textAlign: "right",
              }}
            >
              <Typography variant="body2">{msg.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderTop: "1px solid #ccc",
          p: 1,
          backgroundColor: "#f0f0f0",
        }}
      >
        <InputBase
          placeholder="הקלד הודעה"
          sx={{
            ml: 1,
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}
        />
        <IconButton sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Box>

      <ChatMenu
        anchorEl={anchorEL}
        isOpen={isMenuOpen}
        onClose={() => setMenuOpen(false)}
        handleUnmatch={handleUnmatch}
        chat={chat}
      />
    </Box>
  );
}

export default ChatPage;
