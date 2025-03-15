import { jwtDecode } from "jwt-decode";

// for users
const TOKEN = "my token";
const setTokenInLocalStorage = (token) => {
  localStorage.setItem(TOKEN, token);
};
const removeTokenFromLocalStorage = () => localStorage.removeItem(TOKEN);
const getTokenFromLocalStorage = () => localStorage.getItem(TOKEN);

// for dogs
const LAST_DOG = "my dog";
const setLastDogInLocalStorage = (lastDog) => {
  localStorage.setItem(LAST_DOG, lastDog);
};
const removeDogFromLocalStorage = () => localStorage.removeItem(LAST_DOG);
const getDogFromLocalStorage = () => localStorage.getItem(LAST_DOG);

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
  setLastDogInLocalStorage,
  removeDogFromLocalStorage,
  getDogFromLocalStorage,
};
