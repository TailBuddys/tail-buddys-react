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

const getAllChats = async (dogId) => {
  try {
    const url = `${apiUrl}?dogId=${dogId}`;
    const { data } = await axios.get(url);
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

const updateChat = async (chatId, isArchive) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/${chatId}?isArchive=${isArchive}`
    );
    return data;
  } catch (error) {
    console.error("Failed to update chat:", error);
    throw new Error(error.response?.data || error.message);
  }
};

export {
  createChat,
  getAllChats,
  getChatById,
  deleteChat,
  addMessageToChat,
  updateChat,
};
