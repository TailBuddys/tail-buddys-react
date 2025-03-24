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

  const value = useMemo(
    () => ({ user, token, loginDog, setUser, setToken, setLoginDog }),
    [user, token, loginDog]
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

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be use withing a Provider");
  return context;
};
