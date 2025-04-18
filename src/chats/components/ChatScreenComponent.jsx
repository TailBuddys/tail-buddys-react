import ChatsListPage from "../pages/ChatsListPage";

const ChatScreenComponent = ({ handleUnmatch, chats }) => {
  return <ChatsListPage handleUnmatch={handleUnmatch} chats={chats} />;
};

export default ChatScreenComponent;
