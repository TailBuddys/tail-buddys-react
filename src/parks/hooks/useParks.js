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
import { getParksFiltersFromLocalStorage } from "../../services/localStorageService";

export default function useParks() {
  const [isParkLoading, setIsParkLoading] = useState(false);
  const navigate = useNavigate();
  const [parkError, setParkError] = useState();
  const [park, setPark] = useState(); // אולי שימוש עתידי.....
  const { snackbarActivation } = useSnackbar();

  useAxios();

  const handleCreatePark = useCallback(
    async (parkFromClient) => {
      setIsParkLoading(true);
      try {
        const normalizedGivenPark = normalizedPark(parkFromClient);
        const createdPark = await createPark(normalizedGivenPark);
        navigate(`${ROUTES.UPLOAD_PARK_IMAGE}/${createdPark.id}`);
      } catch (error) {
        setParkError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsParkLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleGetParkById = useCallback(async (id) => {
    setIsParkLoading(true);
    try {
      const Park = await getParkById(id);
      setIsParkLoading(false);
      return Park;
    } catch (error) {
      setParkError(error.message);
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
        setParkError(error.message);
      }
      // אולי נכווין למקום אחר
      navigate(ROUTES.ROOT);
      setIsParkLoading(false);
    },
    [snackbarActivation, navigate]
  );

  const handleGetAllParks = useCallback(async (id) => {
    // להכניס פילטרציה
    setIsParkLoading(true);
    try {
      const filters = getParksFiltersFromLocalStorage();
      if (id !== null) {
        const parksData = await getAllParks(id, filters ?? {});
        setIsParkLoading(false);
        return parksData;
      } else {
        const parksData = await getAllParks(filters ?? {});
        setIsParkLoading(false);
        return parksData;
      }
    } catch (err) {
      setParkError(err.message);
    }
    setIsParkLoading(false);
  }, []);

  const handleDeletePark = useCallback(
    async (id) => {
      setIsParkLoading(true);
      try {
        const deletedPark = await deletePark(id);
        snackbarActivation(
          "success",
          `You deleted ${deletedPark.name} successfully`
        );
      } catch (error) {
        setParkError(error.message);
      }
      window.location.reload();
    },
    [snackbarActivation]
  );

  const handleLikeUnlikePark = useCallback(async (parkId, dogId) => {
    setIsParkLoading(true);
    try {
      const updatedPark = await likeUnlikePark(parkId, dogId);
      return updatedPark;
    } catch (error) {
      setParkError(error.message);
    }
  }, []);

  return {
    parkError,
    isParkLoading,
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
