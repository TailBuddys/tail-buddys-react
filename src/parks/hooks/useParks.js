import { useCallback, useState } from "react";
import ROUTES from "../../routes/routesModel";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {
  createPark,
  getParkById,
  // getAllParks,
  // updatePark,
  // deletePark,
  // likeUnlikePark,
} from "../services/ParksApiService";
// import {
//   getUser,
//   getDogFromLocalStorage,
// } from "../../services/localStorageService";
// import { useUser } from "../../users/providers/UserProvider";
import normalizedPark from "../helpers/normalization/normalizedPark";

export default function useParks() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState();
  const [park, setPark] = useState(); // אולי שימוש עתידי.....
  // const { loginDog, user } = useUser();
  const { snackbarActivation } = useSnackbar();

  useAxios();

  const handleCreatePark = useCallback(
    async (parkFromClient) => {
      setIsLoading(true);
      try {
        const normalizedGivenPark = normalizedPark(parkFromClient);
        const createdPark = await createPark(normalizedGivenPark);
        navigate(`${ROUTES.UPLOAD_PARK_IMAGE}/${createdPark.id}`);
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleGetParkById = useCallback(async (id) => {
    setIsLoading(true);
    try {
      const Park = await getParkById(id);
      setIsLoading(false);
      return Park;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const handleUpdatePark = useCallback(
    async (parkFromClient) => {
      //     try {
      //       const normalizedDog = await updateDog(
      //         loginDog,
      //         normalizedExistingDog(dogFromClient)
      //       );
      //       snackbarActivation(
      //         "success",
      //         `${normalizedDog.name} your details has been successfully updated`
      //       );
      //     } catch (error) {
      //       setError(error.message);
      //     }
      //     navigate(ROUTES.ROOT);
      //     setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  // const handleGetAllDogs = useCallback(async () => {
  //   setIsLoading(true);
  //   try {
  //     const dogsData = await getAllDogs();
  //     setIsLoading(false);
  //     return dogsData;
  //   } catch (err) {
  //     setError(err.message);
  //   }
  //   setIsLoading(false);
  // }, []);

  const handleDeletePark = useCallback(
    async (id) => {
      console.log("park id is");
      console.log(id);

      //   setIsLoading(true);
      //   try {
      //     const deletedDog = await deleteDog(loginDog);
      //     await setTokenInLocalStorage(deletedDog.refreshToken);
      //     setToken(deletedDog.refreshToken);
      //     const currentUserDogs = await getUserDogs();
      //     if (currentUserDogs !== null && currentUserDogs.length > 0) {
      //       await setLastDogInLocalStorage(String(currentUserDogs[0].id));
      //       setLoginDog(String(currentUserDogs[0].id));
      //     } else {
      //       removeDogFromLocalStorage();
      //       setLoginDog(null);
      //     }
      //     snackbarActivation("success", `You deleted dog successfully`);
      //   } catch (error) {
      //     setError(error.message);
      //   }
      //   navigate(ROUTES.ROOT);
    },
    [snackbarActivation, navigate]
  );

  return {
    error,
    isLoading,
    park,
    setPark,
    handleCreatePark,
    handleGetParkById,
    handleUpdatePark,
    handleDeletePark,
  };
}
