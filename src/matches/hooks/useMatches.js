import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import {
  createMatchInteraction,
  deleteMatch,
  getAllMatches,
  updateMatch,
} from "../services/matchApiService";
import normalizedMatch from "../helpers/normalization/normalizedMatch";

export default function useMatches() {
  const [isMatchLoading, setIsMatchLoading] = useState(false);
  const [matchError, setMatchError] = useState();
  const [matches, setMatches] = useState([]);

  useAxios();

  const handleMatchInteraction = useCallback(
    async (senderDogId, reciverDogId, isLike) => {
      setIsMatchLoading(true);
      try {
        const normalMatch = normalizedMatch(senderDogId, reciverDogId, isLike);
        const createdIntaraction = await createMatchInteraction(normalMatch);
        setIsMatchLoading(false);
        return createdIntaraction;
      } catch (error) {
        setMatchError(error.message);
      }
    },
    []
  );

  const handleGetAllMatches = useCallback(async (dogId) => {
    setIsMatchLoading(true);
    try {
      const dogMatches = await getAllMatches(dogId);
      setIsMatchLoading(false);
      setMatches(dogMatches);
      return dogMatches;
    } catch (error) {
      setMatchError(error.message);
    }
  }, []);

  const handleUpdateMatche = useCallback(
    async (matchId, senderDog, reciverDog, isLike) => {
      setIsMatchLoading(true);
      try {
        const normalMatch = normalizedMatch(senderDog, reciverDog, isLike);
        const updatedMatch = await updateMatch(matchId, normalMatch);
        setIsMatchLoading(false);
        return updatedMatch;
      } catch (error) {
        setMatchError(error.message);
      }
    },
    []
  );

  const handleDeleteMatch = useCallback(async (matchId) => {
    setIsMatchLoading(true);
    try {
      const deletedMatch = await deleteMatch(matchId);
      setIsMatchLoading(false);
      return deletedMatch;
    } catch (error) {
      setMatchError(error.message);
    }
  }, []);

  return {
    isMatchLoading,
    matchError,
    matches,
    setMatches,
    handleMatchInteraction,
    handleGetAllMatches,
    handleUpdateMatche,
    handleDeleteMatch,
  };
}
