import { formatSmartTime } from "../../utils/dateMethods";

const ChatsToModel = (ChatsData) => {
  return ChatsData.map((chat) => ({
    id: chat.id,
    dogId: chat.dog.id,
    dogName: chat.dog.name,
    dogImageUrl: chat.dog.imageUrl,
    lastMessage: chat.lastMessage?.content || null,
    time: chat.lastMessage ? formatSmartTime(chat.lastMessage.createdAt) : null,
  }));
};

export default ChatsToModel;
