import React, { useEffect, useState } from "react";
import CardComponent from "../../components/card/CardComponent";
import useDogs from "../hooks/useDogs";
import { useLocation, useNavigate } from "react-router-dom";
import { getDogFromLocalStorage } from "../../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { Box } from "@mui/material";
// import EditDogButton from "../components/EditDogButton";

function DogProfilePage() {
  const { handleGetDogById, error, isLoading } = useDogs();
  const navigate = useNavigate();
  const location = useLocation();
  const [dogData, setDogData] = useState();

  const chat = location.state?.chat;

  useEffect(() => {
    const getData = async () => {
      let dogId;

      if (chat && chat.dogId) {
        dogId = chat.dogId;
      } else {
        const localDogId = getDogFromLocalStorage();
        if (!localDogId) return navigate(ROUTES.ROOT);
        dogId = localDogId;
      }

      const fetchedDog = await handleGetDogById(dogId);
      setDogData(fetchedDog);
    };
    getData();
  }, [handleGetDogById, navigate, chat]);

  if (error) return <Error errorMessage={error} />;
  if (isLoading) return <Spinner />;
  if (dogData) {
    return (
      <Box>
        <CardComponent data={dogData} />
      </Box>
    );
  }
}

export default DogProfilePage;
