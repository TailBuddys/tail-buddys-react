import ChatsListPage from "../pages/ChatsListPage";

const ChatScreenComponent = ({
  chats,
  isChatLoading,
  chatError,
  handleDeleteChat,
  joinChatRoom,
  leaveChatRoom,
  chatNotifications,
  handleUpdateChat,
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
      handleUpdateChat={handleUpdateChat}
    />
  );
};

export default ChatScreenComponent;
