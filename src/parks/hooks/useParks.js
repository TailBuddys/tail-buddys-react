import { useCallback, useState } from "react";
import ROUTES from "../../routes/routesModel";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import {
  createPark,
  deletePark,
  getAllParks,
  getParkById,
  updatePark,
  likeUnlikePark,
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
      try {
        const normalizePark = await updatePark(
          parkFromClient.id,
          normalizedPark(parkFromClient)
        );
        snackbarActivation(
          "success",
          `${normalizePark.name} your details has been successfully updated`
        );
      } catch (error) {
        setError(error.message);
      }
      // אולי נכווין למקום אחר
      navigate(ROUTES.ROOT);
      setIsLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleGetAllParks = useCallback(async (id) => {
    // להכניס פילטרציה
    setIsLoading(true);
    try {
      if (id !== null) {
        const parksData = await getAllParks(id);
        setIsLoading(false);
        return parksData;
      } else {
        const parksData = await getAllParks();
        setIsLoading(false);
        return parksData;
      }
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const handleDeletePark = useCallback(
    async (id) => {
      setIsLoading(true);
      try {
        const deletedPark = await deletePark(id);
        snackbarActivation(
          "success",
          `You deleted ${deletedPark.name} successfully`
        );
      } catch (error) {
        setError(error.message);
      }
      window.location.reload();
    },
    [snackbarActivation]
  );

  const handleLikeUnlikePark = useCallback(async (parkId, dogId) => {
    setIsLoading(true);
    try {
      const updatedPark = await likeUnlikePark(parkId, dogId);
      return updatedPark;
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return {
    error,
    isLoading,
    park,
    setPark,
    handleCreatePark,
    handleGetParkById,
    handleUpdatePark,
    handleGetAllParks,
    handleDeletePark,
    handleLikeUnlikePark,
  };
}
