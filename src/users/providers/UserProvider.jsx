import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getDogFromLocalStorage,
  getTokenFromLocalStorage,
  getToShowFromLocalStorage,
  getUser,
  setToShowInLocalStorage,
} from "../../services/localStorageService";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getTokenFromLocalStorage());
  const [loginDog, setLoginDog] = useState(getDogFromLocalStorage());
  const [seeParksOrDogs, setSeeParksOrDogs] = useState(
    () => getToShowFromLocalStorage() || (loginDog && token ? "dogs" : "parks")
  );

  const value = useMemo(
    () => ({
      user,
      token,
      loginDog,
      seeParksOrDogs,
      setUser,
      setToken,
      setLoginDog,
      setSeeParksOrDogs,
    }),
    [user, token, loginDog, seeParksOrDogs]
  );

  // useEffect(() => {
  //   if (!user) {
  //     setUser(getUser());
  //     setLoginDog(getDogFromLocalStorage()); //?!?!?!?
  //   }
  // }, [user, loginDog, token]);
  useEffect(() => {
    if (!user && token) {
      const decodedUser = getUser();
      if (decodedUser && typeof decodedUser === "object") {
        setUser(decodedUser);
      }
      setLoginDog(getDogFromLocalStorage());
    }
  }, [token, user]);

  useEffect(() => {
    if (seeParksOrDogs) {
      setToShowInLocalStorage(seeParksOrDogs);
    }
  }, [seeParksOrDogs]);

  useEffect(() => {
    if (getToShowFromLocalStorage() === null) {
      if (!loginDog || !token) {
        setSeeParksOrDogs("parks");
      } else {
        setSeeParksOrDogs("dogs");
      }
    }
  }, [loginDog, token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be use withing a Provider");
  return context;
};
