import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useDogs from "../hooks/useDogs";

const DogContext = createContext();

export default function DogProvider({ children }) {
  const [dog, setDog] = useState(null);
  const { loginDog } = useUser();
  const { handleGetDogById } = useDogs();

  const value = useMemo(() => ({ dog, setDog }), [dog]);

  useEffect(() => {
    if (loginDog) {
      const fetchDog = async () => {
        try {
          const fetchedDog = await handleGetDogById();
          setDog(fetchedDog);
        } catch (error) {
          console.error("Failed to fetch dog:", error);
        }
      };

      fetchDog();
    }
  }, [loginDog, handleGetDogById]);

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
}

export const useDog = () => {
  const context = useContext(DogContext);
  if (!context) throw new Error("useDog must be use withing a Provider");
  return context;
};
