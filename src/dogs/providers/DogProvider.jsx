import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import useDogs from "../hooks/useDogs";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

const DogContext = createContext();

export default function DogProvider({ children }) {
  const [dog, setDog] = useState(null);
  const { user, loginDog } = useUser();
  const { handleGetDogById } = useDogs();
  const navigate = useNavigate();

  const value = useMemo(() => ({ dog, setDog }), [dog]);

  useEffect(() => {
    if (user) {
      if (user.DogId.includes(loginDog)) {
        console.log("relation valid");
      } else {
        console.log("fuck off");
        navigate(ROUTES.ROOT);
      }
    }
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
  }, [user, loginDog, handleGetDogById, navigate]);

  return <DogContext.Provider value={value}>{children}</DogContext.Provider>;
}

export const useDog = () => {
  const context = useContext(DogContext);
  if (!context) throw new Error("useDog must be use withing a Provider");
  return context;
};
