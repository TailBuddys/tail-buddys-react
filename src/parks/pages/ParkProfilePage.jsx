import React, { useEffect } from "react";
import CardComponent from "../../components/card/CardComponent";
import { useParams } from "react-router-dom";
import Error from "../../components/Error";
import Spinner from "../../components/Spinner";
import { Box } from "@mui/material";
import useParks from "../hooks/useParks";

function ParkProfilePage() {
  const { handleGetParkById, park, setPark, error, isLoading } = useParks();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setPark(await handleGetParkById(id));
    };
    getData();
  }, [id, handleGetParkById, setPark]);

  if (error) return <Error errorMessage={error} />;
  if (isLoading) return <Spinner />;
  if (park) {
    return (
      <Box>
        <CardComponent data={park} />
      </Box>
    );
  }
}

export default ParkProfilePage;
