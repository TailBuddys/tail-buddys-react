import { useCallback, useState } from "react";
import { useUser } from "../providers/UserProvider";
import {
  getAllUsers,
  getUserData,
  loginService,
  signUpService,
  updateUser,
} from "../services/usersApiService";
import {
  getUser,
  removeDogFromLocalStorage,
  removeTokenFromLocalStorage,
  setLastDogInLocalStorage,
  setTokenInLocalStorage,
} from "../../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizedUser";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import normalizedExistingUser from "../helpers/normalization/normalizedExistingUser";
import useAxios from "../../hooks/useAxios";

export default function useUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const { setUser, setToken, setLoginDog, loginDog, setSeeParksOrDogs } =
    useUser();
  const { snackbarActivation } = useSnackbar();
  const [existingUser, setExistingUser] = useState([]);

  useAxios();

  const handleLogin = useCallback(
    async (userLogin, isSigned = false) => {
      try {
        setIsLoading(true);
        const token = await loginService(userLogin);
        setTokenInLocalStorage(token);
        setToken(token);
        const decodedUser = getUser();
        setUser(decodedUser);

        if (!decodedUser?.DogId?.length) {
          navigate(ROUTES.ROOT);
        } else {
          if (!loginDog || !decodedUser.DogId.includes(loginDog)) {
            setLoginDog(setLastDogInLocalStorage(decodedUser.DogId[0]));
          }
          navigate(ROUTES.ROOT);
        }

        isSigned
          ? snackbarActivation(
              "success",
              "filled",
              "SIGNED UP and LOGGED IN Successfully"
            )
          : snackbarActivation("success", "LOGGED IN Successfuly", "filled");
        return;
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
        setIsLoading(false);
      }
      setIsLoading(false);
    },
    [setToken, setLoginDog, setUser, navigate, snackbarActivation, loginDog]
  );

  const handleLogout = useCallback(() => {
    removeTokenFromLocalStorage();
    setUser(null);
    removeDogFromLocalStorage();
    setLoginDog(null);
    snackbarActivation("success", "LOGGEDOUT Succesfuly", "filled");
    window.location.reload();
  }, [setUser, setLoginDog, snackbarActivation]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      setIsLoading(true);
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signUpService(normalizedUser);
        await handleLogin(
          {
            email: userFromClient.email,
            password: userFromClient.password,
          },
          true
        );
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [handleLogin, snackbarActivation]
  );

  const handleGetUser = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const userData = await getUserData(id);
      setIsLoading(false);
      return userData;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleUpdateUser = useCallback(
    async (user, userFromClient) => {
      setIsLoading(true);

      try {
        const normalizedUser = await updateUser(
          user.id,
          normalizedExistingUser(userFromClient)
        );
        setExistingUser(normalizedUser);
        snackbarActivation(
          "success",
          `${normalizedUser.name.first} your details has been successfully updated`
        );
      } catch (error) {
        setError(error.message);
      }
      navigate(ROUTES.ROOT);
      setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleGetAllUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const usersData = await getAllUsers();
      setIsLoading(false);
      return usersData;
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleDeleteUser = useCallback(
    async (user) => {
      setIsLoading(true);

      try {
        const data = await updateUser(user.id);
        snackbarActivation(
          "success",
          `You deleted user:${user.name.first} successfully`
        );
        return data;
      } catch (error) {
        setError(error.message);
      }
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    },
    [snackbarActivation]
  );

  const handleSwitchParksDogs = (event) => {
    if (event.target.checked === false) {
      setSeeParksOrDogs("dogs");
    } else {
      setSeeParksOrDogs("parks");
    }
  };

  return {
    error,
    isLoading,
    existingUser,
    handleLogin,
    handleLogout,
    handleSignup,
    handleGetUser,
    handleUpdateUser,
    setExistingUser,
    handleGetAllUsers,
    handleDeleteUser,
    handleSwitchParksDogs,
  };
}
