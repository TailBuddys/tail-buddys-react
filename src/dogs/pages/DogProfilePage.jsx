import React, { useEffect, useState } from "react";
import CardComponent from "../../components/card/CardComponent";
import useDogs from "../hooks/useDogs";
import { useNavigate } from "react-router-dom";
import { getDogFromLocalStorage } from "../../services/localStorageService";
import ROUTES from "../../routes/routesModel";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { Box } from "@mui/material";
// import EditDogButton from "../components/EditDogButton";

function DogProfilePage() {
  const { handleGetDogById, error, isLoading } = useDogs();
  const navigate = useNavigate();
  const [dogData, setDogData] = useState();

  useEffect(() => {
    const dog = getDogFromLocalStorage();
    if (!dog) {
      return navigate(ROUTES.ROOT);
    }
    const getData = async () => {
      setDogData(await handleGetDogById(dog));
    };
    getData();
  }, [handleGetDogById, navigate]);

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
