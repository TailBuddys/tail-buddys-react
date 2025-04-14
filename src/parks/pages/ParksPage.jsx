import React, { useEffect, useState } from "react";
import useParks from "../hooks/useParks";
import ParksCarouselComponent from "../components/ParksCarouselComponent";

function ParksPage() {
  const { handleGetAllParks, isLoading, error } = useParks();
  const [presentedPark, setPresentedPark] = useState();
  const [parksData, setParksData] = useState([]);

  useEffect(() => {
    handleGetAllParks().then((parks) => {
      setParksData(parks);
    });
  }, [handleGetAllParks]);

  return (
    <ParksCarouselComponent
      parksData={parksData}
      isLoading={isLoading}
      error={error}
    />
  );
}

export default ParksPage;
