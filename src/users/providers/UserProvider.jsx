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
  getUser,
} from "../../services/localStorageService";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getTokenFromLocalStorage());
  const [loginDog, setLoginDog] = useState(getDogFromLocalStorage());
  const [seeParksOrDogs, setSeeParksOrDogs] = useState(null);

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
    if (!loginDog || !token) {
      setSeeParksOrDogs("parks");
    } else if (seeParksOrDogs === "dogs") {
      setSeeParksOrDogs("dogs");
    }
  }, [loginDog, token, seeParksOrDogs]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be use withing a Provider");
  return context;
};
