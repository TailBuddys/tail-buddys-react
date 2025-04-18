const normalizedChatMessage = (chatID, senderDog, content) => ({
  chatID: chatID,
  senderDogId: senderDog,
  content: content,
});
export default normalizedChatMessage;
