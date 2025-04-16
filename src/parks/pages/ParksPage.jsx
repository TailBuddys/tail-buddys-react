import React from "react";
import ParksCarouselComponent from "../components/ParksCarouselComponent";

function ParksPage({
  isLoading,
  error,
  parksData,
  setPresentedPark,
  presentedPark,
}) {
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
