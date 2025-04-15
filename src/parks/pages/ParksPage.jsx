import React, { useEffect, useState } from "react";
import useParks from "../hooks/useParks";
import ParksCarouselComponent from "../components/ParksCarouselComponent";

function ParksPage({
  isLoading,
  error,
  parksData,
  setPresentedPark,
  presentedPark,
}) {
  // const { handleGetAllParks, isLoading, error } = useParks();
  // const [parksData, setParksData] = useState([]);

  // useEffect(() => {
  //   handleGetAllParks().then((parks) => {
  //     setParksData(parks);
  //   });
  // }, [handleGetAllParks]);

  return (
    <ParksCarouselComponent
      parksData={parksData}
      isLoading={isLoading}
      error={error}
      setPresentedPark={setPresentedPark}
      presentedPark={presentedPark}
    />
  );
}

export default ParksPage;
