import { useCallback, useState } from "react";
import ROUTES from "../../routes/routesModel";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import normalizeDog from "../helpers/normalization/normalizedDog";
import {
  createDog,
  deleteDog,
  getAllDogs,
  getDogById,
  getUnmatchedDogs,
  getUserDogs,
  updateDog,
} from "../services/dogsApiService";
import {
  removeDogFromLocalStorage,
  setLastDogInLocalStorage,
} from "../../services/localStorageService";
import normalizedExistingDog from "../helpers/normalization/normalizedExistingDog";
import { useUser } from "../../users/providers/UserProvider";

export default function useDogs() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { loginDog, setToken, setLoginDog } = useUser();
  const { snackbarActivation } = useSnackbar();

  useAxios();

  const handleCreateDog = useCallback(
    async (dogFromClient) => {
      setIsLoading(true);
      try {
        const normalizedDog = normalizeDog(dogFromClient);
        const createdDog = await createDog(normalizedDog);
        await setLastDogInLocalStorage(createdDog.id);
        setLoginDog(createdDog.id);
        setToken(createdDog.refreshToken);
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation, setLoginDog, setToken]
  );

  const handleGetUserDogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const userDogs = await getUserDogs();
      setIsLoading(false);
      return userDogs;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleGetDogById = useCallback(async () => {
    setIsLoading(true);
    try {
      const Dog = await getDogById(loginDog);
      setIsLoading(false);
      return Dog;
    } catch (error) {
      setError(error.message);
    }
  }, [loginDog]);

  const handleUpdateDog = useCallback(
    async (dogFromClient) => {
      setIsLoading(true);

      try {
        const normalizedDog = await updateDog(
          loginDog,
          normalizedExistingDog(dogFromClient)
        );
        snackbarActivation(
          "success",
          `${normalizedDog.name} your details has been successfully updated`
        );
      } catch (error) {
        setError(error.message);
      }
      navigate(ROUTES.ROOT);
      setIsLoading(false);
    },
    [snackbarActivation, navigate, loginDog]
  );

  const handleGetAllDogsAdmin = useCallback(async () => {
    setIsLoading(true);
    try {
      const dogsData = await getAllDogs();
      setIsLoading(false);
      return dogsData;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  // צריך לשמור את הפילטרים בצורה ראויה
  const handleGetUnmatchedDogs = useCallback(
    async (filters) => {
      setIsLoading(true);
      try {
        const dogsData = await getUnmatchedDogs(loginDog, filters);
        setIsLoading(false);
        return dogsData;
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    },
    [loginDog]
  );

  const handleDeleteDog = useCallback(async () => {
    setIsLoading(true);

    try {
      const deletedDog = await deleteDog(loginDog);
      setToken(deletedDog.refreshToken);
      const currentUserDogs = await getUserDogs();
      if (currentUserDogs !== null && currentUserDogs.length > 0) {
        setLoginDog(currentUserDogs[0].id);
      } else {
        removeDogFromLocalStorage();
      }
      snackbarActivation("success", `You deleted dog successfully`);
    } catch (error) {
      setError(error.message);
    }
    setTimeout(() => {
      // window.location.reload();
      navigate(ROUTES.ROOT);
    }, 1500);
  }, [snackbarActivation, setToken, navigate, loginDog, setLoginDog]);

  return {
    error,
    isLoading,
    handleCreateDog,
    handleGetUserDogs,
    handleGetDogById,
    handleUpdateDog,
    handleGetAllDogsAdmin,
    handleGetUnmatchedDogs,
    handleDeleteDog,
  };
}
