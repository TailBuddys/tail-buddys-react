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
  getDogTypes,
  getUnmatchedDogs,
  getUserDogs,
  updateDog,
} from "../services/dogsApiService";
import {
  getDogsFiltersFromLocalStorage,
  getUser,
  removeDogFromLocalStorage,
  setLastDogInLocalStorage,
  setTokenInLocalStorage,
} from "../../services/localStorageService";
import normalizedExistingDog from "../helpers/normalization/normalizedExistingDog";
import { useUser } from "../../users/providers/UserProvider";

export default function useDogs() {
  const [dogTypes, setDogTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();

  const { loginDog, setToken, setUser, setLoginDog } = useUser();
  const { snackbarActivation } = useSnackbar();

  useAxios();

  const handleCreateDog = useCallback(
    async (dogFromClient) => {
      setIsLoading(true);
      try {
        const normalizedDog = normalizeDog(dogFromClient);
        const createdDog = await createDog(normalizedDog);
        await setTokenInLocalStorage(createdDog.refreshToken);
        setToken(createdDog.refreshToken);

        const decodedUser = getUser();
        if (decodedUser && typeof decodedUser === "object") {
          setUser(decodedUser);
        }

        await setLastDogInLocalStorage(String(createdDog.id));
        setLoginDog(String(createdDog.id));
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
      setTimeout(() => {
        navigate(ROUTES.UPLOAD_DOG_IMAGE);
      }, 200);
    },
    [snackbarActivation, setLoginDog, setToken, setUser, navigate]
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

  const handleSwitchDog = useCallback(async (dogId) => {
    setIsLoading(true);
    try {
      await setLastDogInLocalStorage(dogId);
      setIsLoading(false);
      window.location.reload();
      return;
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
  const handleGetUnmatchedDogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const dogsFilter = getDogsFiltersFromLocalStorage();
      const dogsData = await getUnmatchedDogs(loginDog, dogsFilter ?? {});
      setIsLoading(false);
      return dogsData;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [loginDog]);

  const handleDeleteDog = useCallback(async () => {
    setIsLoading(true);

    try {
      const deletedDog = await deleteDog(loginDog);
      await setTokenInLocalStorage(deletedDog.refreshToken);
      setToken(deletedDog.refreshToken);
      const currentUserDogs = await getUserDogs();
      if (currentUserDogs !== null && currentUserDogs.length > 0) {
        await setLastDogInLocalStorage(String(currentUserDogs[0].id));
        setLoginDog(String(currentUserDogs[0].id));
      } else {
        removeDogFromLocalStorage();
        setLoginDog(null);
      }
      snackbarActivation("success", `You deleted dog successfully`);
    } catch (error) {
      setError(error.message);
    }
    navigate(ROUTES.ROOT);
  }, [snackbarActivation, setToken, navigate, loginDog, setLoginDog]);

  const fetchDogTypes = useCallback(async () => {
    setIsLoading(true);

    try {
      const types = await getDogTypes();
      setDogTypes(types);
      return types;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return {
    error,
    isLoading,
    dogTypes,
    handleCreateDog,
    handleGetUserDogs,
    handleSwitchDog,
    handleGetDogById,
    handleUpdateDog,
    handleGetAllDogsAdmin,
    handleGetUnmatchedDogs,
    handleDeleteDog,
    fetchDogTypes,
  };
}
