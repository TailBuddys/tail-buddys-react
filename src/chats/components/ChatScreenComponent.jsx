import ChatsListPage from "../pages/ChatsListPage";

const ChatScreenComponent = ({
  chats,
  isChatLoading,
  chatError,
  handleDeleteChat,
}) => {
  return (
    <ChatsListPage
      isChatLoading={isChatLoading}
      chatError={chatError}
      handleDeleteChat={handleDeleteChat}
      chats={chats}
    />
  );
};

export default ChatScreenComponent;
