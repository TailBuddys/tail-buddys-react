import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useDogs from "../hooks/useDogs";
import { useNavigate } from "react-router-dom";
import {
  removeDogFromLocalStorage,
  setLastDogInLocalStorage,
} from "../../services/localStorageService";

const DogContext = createContext();

export default function DogProvider({ children }) {
  const [dog, setDog] = useState(null);
  const { setLoginDog, user, loginDog } = useUser();
  const { handleGetDogById, handleGetUserDogs } = useDogs();
  const [userDogs, setUserDogs] = useState();
  const navigate = useNavigate();

  const value = useMemo(
    () => ({ dog, userDogs, setDog, setUserDogs }),
    [dog, userDogs]
  );

  useEffect(() => {
    if (user) {
      if (user.DogId?.includes(loginDog)) {
        console.log("relation valid");
      } else if (user.DogId) {
        console.log("fuck off");
        setLoginDog(setLastDogInLocalStorage(user.DogId[0]));
        window.location.reload();
      } else {
        console.log("you have no dogs");
        removeDogFromLocalStorage();
        setLoginDog(null);
      }
    }

    if (loginDog) {
      const fetchDogs = async () => {
        try {
          const fetchedDog = await handleGetDogById();
          setDog(fetchedDog);
          const fetchedUserDogs = await handleGetUserDogs();
          setUserDogs(fetchedUserDogs);
        } catch (error) {
          console.error("Failed to fetch dog or user Dogs:", error);
        }
      };

      fetchDogs();
    }
  }, [
    setLoginDog,
    user,
    loginDog,
    handleGetDogById,
    handleGetUserDogs,
    navigate,
  ]);

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
}

export const useDog = () => {
  const context = useContext(DogContext);
  if (!context) throw new Error("useDog must be use withing a Provider");
  return context;
};
