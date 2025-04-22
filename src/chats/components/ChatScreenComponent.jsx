import ChatsListPage from "../pages/ChatsListPage";

const ChatScreenComponent = ({
  chats,
  isChatLoading,
  chatError,
  handleDeleteChat,
  joinChatRoom,
  leaveChatRoom,
  chatNotifications,
}) => {
  return (
    <ChatsListPage
      isChatLoading={isChatLoading}
      chatError={chatError}
      handleDeleteChat={handleDeleteChat}
      chats={chats}
      joinChatRoom={joinChatRoom}
      leaveChatRoom={leaveChatRoom}
      chatNotifications={chatNotifications}
    />
  );
};

export default ChatScreenComponent;
