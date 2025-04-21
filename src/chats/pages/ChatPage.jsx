import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  Paper,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import useChats from "../hooks/useChats";
import Spinner from "../../components/Spinner";
import CheckIcon from "@mui/icons-material/Check";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Error from "../../components/Error";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

function ChatPage({ chat, handleBackToList, joinChatRoom, leaveChatRoom }) {
  const {
    isChatLoading,
    chatError,
    handleGetChatById,
    handleAddMessageToChat,
  } = useChats();
  const [chatData, setChatData] = useState();
  const [messageContent, setMessageContent] = useState("");
  const navigate = useNavigate();
  const messageRef = useRef();
  let lastShownTime = null;

  useEffect(() => {
    if (chat) {
      handleGetChatById(chat.id).then((chat) => {
        setChatData(chat);
      }); //?????????????????? לרנדר שוב
    }
  }, [handleGetChatById, chat]);

  const SendMessage = () => {
    handleAddMessageToChat(
      chatData.id,
      chatData.senderDog.id !== chat.dogId
        ? chatData.senderDog.id
        : chatData.receiverDog.id,
      messageContent
    ).then((message) => {
      setChatData((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    });

    setMessageContent("");
  };

  useEffect(() => {
    if (!chat?.id && joinChatRoom && leaveChatRoom) return;
    joinChatRoom(chat.id);

    return () => {
      leaveChatRoom(chat.id);
    };
  }, [chat?.id, joinChatRoom, leaveChatRoom]);

  // useEffect(() => {
  //   if (messageRef && messageRef.current) {
  //     const { scrollHeight, clientHeight } = messageRef.current;
  //     messageRef.current.scrollTo({
  //       left: 0,
  //       top: scrollHeight - clientHeight,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [chatData]);

  useLayoutEffect(() => {
    if (chatData?.messages?.length && messageRef.current) {
      const container = messageRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chatData]);

  if (chatError) return <Error />;
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
          <Avatar
            sx={{ ml: 1, mr: 1 }}
            src={chat.dogImageUrl}
            alt={chat.dogName}
          />
          <Typography variant="subtitle1" sx={{ mr: 1 }}>
            {chat.dogName}
          </Typography>
        </Box>
        <Tooltip
          title={`Go to ${chat.dogName} profile`}
          slots={{
            transition: Zoom,
          }}
          arrow
        >
          <IconButton
            onClick={() => {
              navigate(ROUTES.DOG_PROFILE, { state: { chat } });
            }}
          >
            <Avatar src="/assets/images/dogProfileIcon.png" />
          </IconButton>
        </Tooltip>
      </Box>

      {isChatLoading ? (
        <Spinner />
      ) : (
        <Box
          ref={messageRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 1,
            backgroundColor: "#e5ddd5",
            "&::-webkit-scrollbar": {
              display: "none",
            },
            scrollbarWidth: "none",
          }}
        >
          {chatData?.messages.map((msg) => {
            const shouldShowTime = msg.time !== lastShownTime;
            if (shouldShowTime) {
              lastShownTime = msg.time;
            }
            return (
              <React.Fragment key={msg.id}>
                {shouldShowTime && (
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(0, 0, 0, 0.54)",
                      display: "flex",
                      justifyContent:
                        msg.senderDogId === chat.dogId
                          ? "flex-start"
                          : "flex-end",
                    }}
                  >
                    {msg.time}
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.senderDogId === chat.dogId
                        ? "flex-start"
                        : "flex-end",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      pl: 2,
                      pt: 1,
                      pb: 0.5,
                      maxWidth: "70%",
                      backgroundColor:
                        msg.senderDogId === chat.dogId ? "#fff" : "#dcf8c6",
                      textAlign: "right",
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body2">{msg.content}</Typography>
                    {msg.isRead === false ? (
                      <CheckIcon
                        sx={{
                          fontSize: "small",
                          alignSelf: "flex-end",
                          mt: 1,
                          mr: 0.5,
                        }}
                      />
                    ) : (
                      <DoneAllIcon
                        sx={{
                          color: "blue",
                          fontSize: "small",
                          alignSelf: "flex-end",
                          mt: 1,
                          mr: 0.5,
                        }}
                      />
                    )}
                  </Paper>
                </Box>
              </React.Fragment>
            );
          })}
        </Box>
      )}

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
          value={messageContent}
          placeholder="Type Message..."
          onChange={(e) => {
            setMessageContent(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && messageContent.trim() !== "") {
              SendMessage();
            }
          }}
          sx={{
            ml: 1,
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: 2,
            px: 2,
            py: 0.5,
          }}
        />
        <IconButton
          sx={{ ml: 1 }}
          onClick={() => {
            SendMessage();
          }}
          disabled={messageContent.trim() === ""}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default ChatPage;
