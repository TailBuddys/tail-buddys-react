import axios from "axios";

const apiUrl = "https://localhost:7121/chat";

const createChat = async (chatData) => {
  try {
    const { data } = await axios.post(apiUrl, chatData);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getAllChats = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const getChatById = async (id) => {
  try {
    const url = `${apiUrl}/${id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const deleteChat = async (chatId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${chatId}`);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const addMessageToChat = async (chatData) => {
  try {
    const url = `${apiUrl}/message`;
    const { data } = await axios.post(url, chatData);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const getMessagesByChatId = async (chatId) => {
  try {
    const url = `${apiUrl}/message/${chatId}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const markMessageAsRead = async (messageId) => {
  try {
    const url = `${apiUrl}/message/${messageId}`;
    const { data } = await axios.patch(url);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

export {
  createChat,
  getAllChats,
  getChatById,
  deleteChat,
  addMessageToChat,
  getMessagesByChatId,
  markMessageAsRead,
};
