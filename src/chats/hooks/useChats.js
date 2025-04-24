import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  addMessageToChat,
  createChat,
  deleteChat,
  getAllChats,
  getChatById,
  updateChat,
} from "../services/chatsApiService";
import normalizedChat from "../helpers/normalization/normalizedChat";
import normalizedChatMessage from "../helpers/normalization/normalizedChatMessage";
import ChatsToModel from "../helpers/normalization/ChatsToModel";
import OneChatToModel from "../helpers/normalization/OneChatToModel";
import UpdatedChatToModel from "../helpers/normalization/UpdatedChatToModel";

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
    // setIsChatLoading(true);
    try {
      const chat = OneChatToModel(await getChatById(chatId));
      // setIsChatLoading(false);
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

  const handleUpdateChat = useCallback(async (chatId, isArchive) => {
    try {
      const updatedChatRaw = await updateChat(chatId, isArchive);
      const updatedChat = UpdatedChatToModel(updatedChatRaw);
      setChats((prevChats) =>
        prevChats.map((chat) => (chat.id === chatId ? updatedChat : chat))
      );

      return updatedChat;
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
    handleUpdateChat,
  };
}
