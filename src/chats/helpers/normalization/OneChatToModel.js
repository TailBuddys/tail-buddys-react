const OneChatToModel = (ChatData) => {
  return {
    id: ChatData.id,
    senderDog: {
      id: ChatData.senderDog.id,
      name: ChatData.senderDog.name,
      imageUrl: ChatData.senderDog.imageUrl,
    },
    receiverDog: {
      id: ChatData.receiverDog.id,
      name: ChatData.receiverDog.name,
      imageUrl: ChatData.receiverDog.imageUrl,
    },
    messages: ChatData.messages.map((message) => ({
      id: message.id,
      chatID: message.chatID,
      senderDogId: message.senderDogId,
      content: message.content,
      isRead: message.isRead,
      time: message.createdAt
        ? new Date(message.createdAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
        : null,
    })),
  };
};

export default OneChatToModel;
