import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getTokenFromLocalStorage,
  getUser,
} from "../services/localStorageService";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getTokenFromLocalStorage());
  const value = useMemo(
    () => ({ user, token, setUser, setToken }),
    [user, token]
  );

  useEffect(() => {
    if (!user) {
      setUser(getUser());
    }
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be use withing a Provider");
  return context;
};
