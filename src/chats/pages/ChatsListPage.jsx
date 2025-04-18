import React, { useState } from "react";
import { Box, Container, Tab, Tabs } from "@mui/material";
import CustomTabPanel from "../../components/CustomTabPanel";
import ChatItemComponent from "../components/ChatItemComponent";
import ChatPage from "./ChatPage";

function ChatsListPage({ handleUnmatch, chats }) {
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

  //-------- מידע זמני -----------------
  chats = [
    {
      avatar: "",
      name: "מושיקו",
      headline: "",
      time: "19:21",
      messages: [
        { id: 1, text: "מה איתך נסיך", sender: "other" },
        { id: 2, text: "אני עוד פה אחי שניה מתחבר", sender: "me" },
        { id: 3, text: "יואלה עכשיו עלה ונכנס", sender: "other" },
        { id: 4, text: "תזניק, אני במודקקה", sender: "me" },
        { id: 5, text: "כפיים", sender: "other" },
        { id: 6, text: "כושילירבאק", sender: "me" },
        { id: 7, text: "איזה 10 ואיזה בטיח", sender: "me" },
        { id: 8, text: "חחחח", sender: "me" },
        { id: 9, text: "חחחחחח  גועל נפש", sender: "other" },
        {
          id: 10,
          text: "טוב אני עושה איזה וייש בבית קצת ונכנס",
          sender: "other",
        },
        { id: 11, text: "🤟", sender: "me" },
        { id: 12, text: "כמה דקות בבית", sender: "other" },
      ],
    },
    {
      avatar: "",
      name: "נוי",
      headline: "",
      time: "17:10",
      messages: [
        { id: 1, text: "מה איתך נסיך", sender: "other" },
        { id: 2, text: "אני עוד פה אחי שניה מתחבר", sender: "me" },
        { id: 3, text: "יואלה עכשיו עלה ונכנס", sender: "other" },
        { id: 4, text: "תזניק, אני במודקקה", sender: "me" },
        { id: 5, text: "כפיים", sender: "other" },
        { id: 6, text: "כושילירבאק", sender: "me" },
        { id: 7, text: "איזה 10 ואיזה בטיח", sender: "me" },
        { id: 8, text: "חחחח", sender: "me" },
        { id: 9, text: "חחחחחח  גועל נפש", sender: "other" },
        {
          id: 10,
          text: "טוב אני עושה איזה וייש בבית קצת ונכנס",
          sender: "other",
        },
        { id: 11, text: "🤟", sender: "me" },
        { id: 12, text: "יאללה כמה זמן?", sender: "other" },
      ],
    },
  ];

  //-------- מידע זמני -----------------

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
              {/* Archive content goes here */}
            </CustomTabPanel>
            <CustomTabPanel value={selectedTab} index={1}>
              {chats.map((chat, index) => (
                <ChatItemComponent
                  key={index}
                  chat={chat}
                  handleUnmatch={handleUnmatch}
                  chatClick={() => handleChatClick(chat)}
                />
              ))}
            </CustomTabPanel>
          </>
        ) : (
          <ChatPage
            handleUnmatch={handleUnmatch}
            chat={activeChat}
            handleBackToList={handleBackToList}
          />
        )}
      </Box>
    </Container>
  );
}

export default ChatsListPage;
