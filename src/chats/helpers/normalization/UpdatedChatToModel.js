import { formatSmartTime } from "../../utils/dateMethods";

const UpdatedChatToModel = (chat) => ({
  id: chat.id,
  dogId: chat.dog?.id ?? null,
  dogName: chat.dog?.name ?? "",
  dogImageUrl: chat.dog?.imageUrl ?? "",
  lastMessage: chat.lastMessage?.content ?? null,
  time: chat.lastMessage?.createdAt
    ? formatSmartTime(chat.lastMessage.createdAt)
    : null,
  isArchive: chat.isArchive ?? false,
});

export default UpdatedChatToModel;
