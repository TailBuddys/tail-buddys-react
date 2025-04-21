import ChatsListPage from "../pages/ChatsListPage";

const ChatScreenComponent = ({
  chats,
  isChatLoading,
  chatError,
  handleDeleteChat,
  joinChatRoom,
  leaveChatRoom,
}) => {
  return (
    <ChatsListPage
      isChatLoading={isChatLoading}
      chatError={chatError}
      handleDeleteChat={handleDeleteChat}
      chats={chats}
      joinChatRoom={joinChatRoom}
      leaveChatRoom={leaveChatRoom}
    />
  );
};

export default ChatScreenComponent;
