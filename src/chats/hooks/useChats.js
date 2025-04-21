import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  addMessageToChat,
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  // getMessagesByChatId,
  markMessageAsRead,
} from "../services/chatsApiService";
import normalizedChat from "../helpers/normalization/normalizedChat";
import normalizedChatMessage from "../helpers/normalization/normalizedChatMessage";
import ChatsToModel from "../helpers/normalization/ChatsToModel";
import OneChatToModel from "../helpers/normalization/OneChatToModel";

export default function useChats() {
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [chatError, setChatError] = useState();
  const [chats, setChats] = useState([]);

  useAxios();

  const handleCreateChat = useCallback(async (senderDogId, receiverDogId) => {
    setIsChatLoading(true);
    try {
      const normalChat = normalizedChat(senderDogId, receiverDogId);
      const newChat = await createChat(normalChat);
      setIsChatLoading(false);
      return newChat;
    } catch (error) {
      setChatError(error.message);
    }
  }, []);

  const handleGetAllChats = useCallback(async (dogId) => {
    try {
      const dogChats = ChatsToModel(await getAllChats(dogId));
      setChats(dogChats);
      return dogChats;
    } catch (error) {
      setChatError(error.message);
    }
  }, []);

  const handleGetChatById = useCallback(async (chatId) => {
    setIsChatLoading(true);
    try {
      const chat = OneChatToModel(await getChatById(chatId));
      setIsChatLoading(false);
      return chat;
    } catch (error) {
      setChatError(error.message);
    }
  }, []);

  const handleDeleteChat = useCallback(async (chatId) => {
    setIsChatLoading(true);
    try {
      const deletedChat = await deleteChat(chatId);
      setIsChatLoading(false);
      return deletedChat;
    } catch (error) {
      setChatError(error.message);
    }
  }, []);

  const handleAddMessageToChat = useCallback(
    async (chatID, senderDogId, content) => {
      try {
        const normalChatMessage = normalizedChatMessage(
          chatID,
          senderDogId,
          content
        );
        const newChatMessage = await addMessageToChat(normalChatMessage);
        return newChatMessage;
      } catch (error) {
        setChatError(error.message);
      }
    },
    []
  );

  // const handleGetMessagesByChatId = useCallback(async (chatId) => {
  //   setIsChatLoading(true);
  //   try {
  //     const chatMessages = await getMessagesByChatId(chatId);
  //     setIsChatLoading(false);
  //     return chatMessages;
  //   } catch (error) {
  //     setChatError(error.message);
  //   }
  // }, []);

  const handleMarkMessageAsRead = useCallback(async (messageId) => {
    setIsChatLoading(true);
    try {
      const messageToMark = await markMessageAsRead(messageId);
      setIsChatLoading(false);
      return messageToMark;
    } catch (error) {
      setChatError(error.message);
    }
  }, []);

  return {
    isChatLoading,
    chatError,
    chats,
    setChats,
    handleCreateChat,
    handleGetAllChats,
    handleGetChatById,
    handleDeleteChat,
    handleAddMessageToChat,
    // handleGetMessagesByChatId,
    handleMarkMessageAsRead,
  };
}
