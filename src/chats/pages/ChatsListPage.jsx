import React, { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../components/CustomTabPanel";
import ChatItemComponent from "../components/ChatItemComponent";
import ChatPage from "./ChatPage";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

function ChatsListPage({
  chats,
  isChatLoading,
  chatError,
  handleDeleteChat,
  joinChatRoom,
  leaveChatRoom,
  chatNotifications,
  handleUpdateChat,
}) {
  const [selectedTab, setselectedTab] = useState(1);
  const [activeChat, setActiveChat] = useState(null);

  const HandlePickTab = (event, pickedTab) => {
    // לבדוק
    setselectedTab(pickedTab);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChatClick = (chat) => {
    setActiveChat(chat);
  };

  const handleBackToList = () => {
    setActiveChat(null);
  };

  if (isChatLoading) return <Spinner />;
  if (chatError) return <Error />;
  return (
    <Container
      sx={{
        paddingTop: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%" }}>
        {!activeChat ? (
          <>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Tabs
                value={selectedTab}
                onChange={HandlePickTab}
                aria-label="basic tabs example"
              >
                <Tab label="Archive" {...a11yProps(0)} />
                <Tab label="Chats" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={selectedTab} index={0}>
              {chats
                .filter((chat) => chat.isArchive) // archived only
                .map((chat, index) => (
                  <ChatItemComponent
                    key={index}
                    chat={chat}
                    handleDeleteChat={handleDeleteChat}
                    handleUpdateChat={handleUpdateChat}
                    chatNotifications={chatNotifications}
                    chatClick={() => handleChatClick(chat)}
                  />
                ))}
            </CustomTabPanel>

            <CustomTabPanel value={selectedTab} index={1}>
              {chats
                .filter((chat) => !chat.isArchive) // active only
                .map((chat, index) => (
                  <ChatItemComponent
                    key={index}
                    chat={chat}
                    handleDeleteChat={handleDeleteChat}
                    handleUpdateChat={handleUpdateChat}
                    chatNotifications={chatNotifications}
                    chatClick={() => handleChatClick(chat)}
                  />
                ))}
            </CustomTabPanel>
          </>
        ) : (
          <ChatPage
            chat={activeChat}
            handleBackToList={handleBackToList}
            joinChatRoom={joinChatRoom}
            leaveChatRoom={leaveChatRoom}
            chatNotifications={chatNotifications}
          />
        )}
      </Box>
    </Container>
  );
}

export default ChatsListPage;
