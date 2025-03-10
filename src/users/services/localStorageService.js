import { jwtDecode } from "jwt-decode";

const TOKEN = "my token";

const setTokenInLocalStorage = (token) => {
  localStorage.setItem(TOKEN, token);
};

const removeTokenFromLocalStorage = () => localStorage.removeItem(TOKEN);

const getTokenFromLocalStorage = () => localStorage.getItem(TOKEN);

const getUser = () => {
  try {
    const myToken = getTokenFromLocalStorage();
    return jwtDecode(myToken);
  } catch (error) {
    return null;
  }
};

export {
  setTokenInLocalStorage,
  removeTokenFromLocalStorage,
  getTokenFromLocalStorage,
  getUser,
};
