import React from "react";
import DogsStackComponent from "../components/DogsStackComponent";

function DogsPage({ isLoading, error, dogsData, handleLikeUnlikeDog }) {
  return (
    <DogsStackComponent
      dogsData={dogsData}
      error={error}
      isLoading={isLoading}
      handleLikeUnlikeDog={handleLikeUnlikeDog}
    />
  );
}

export default DogsPage;
