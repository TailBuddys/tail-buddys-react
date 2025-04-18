import { jwtDecode } from "jwt-decode";

// for users
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

// for dog prefernce
const WHAT_TO_SHOW = "seeParksOrDogs";
const setToShowInLocalStorage = (choice) => {
  localStorage.setItem(WHAT_TO_SHOW, choice);
};
const removeToShowFromLocalStorage = () =>
  localStorage.removeItem(WHAT_TO_SHOW);

const getToShowFromLocalStorage = () => localStorage.getItem(WHAT_TO_SHOW);

// for dogs
const LAST_DOG = "my dog";
const setLastDogInLocalStorage = (lastDog) => {
  localStorage.setItem(LAST_DOG, lastDog);
};
const removeDogFromLocalStorage = () => localStorage.removeItem(LAST_DOG);
const getDogFromLocalStorage = () => localStorage.getItem(LAST_DOG);

const PARKS_FILTERS = "parks Filters";
const setParksFiltersInLocalStorage = (filters) => {
  localStorage.setItem(PARKS_FILTERS, JSON.stringify(filters));
};
const getParksFiltersFromLocalStorage = () => {
  const data = localStorage.getItem(PARKS_FILTERS);
  return data ? JSON.parse(data) : null;
};
const removeParksFiltersFromLocalStorage = () =>
  localStorage.removeItem(PARKS_FILTERS);

const DOGS_FILTERS = "dogs Filters";
const setDogsFiltersInLocalStorage = (filters) => {
  localStorage.setItem(DOGS_FILTERS, JSON.stringify(filters));
};
const getDogsFiltersFromLocalStorage = () => {
  const data = localStorage.getItem(DOGS_FILTERS);
  return data ? JSON.parse(data) : null;
};
const removeDogsFiltersFromLocalStorage = () =>
  localStorage.removeItem(DOGS_FILTERS);

export {
  setTokenInLocalStorage,
  removeTokenFromLocalStorage,
  getTokenFromLocalStorage,
  getUser,
  setToShowInLocalStorage,
  removeToShowFromLocalStorage,
  getToShowFromLocalStorage,
  setLastDogInLocalStorage,
  removeDogFromLocalStorage,
  getDogFromLocalStorage,
  setParksFiltersInLocalStorage,
  getParksFiltersFromLocalStorage,
  removeParksFiltersFromLocalStorage,
  setDogsFiltersInLocalStorage,
  getDogsFiltersFromLocalStorage,
  removeDogsFiltersFromLocalStorage,
};
