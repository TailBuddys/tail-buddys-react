import React from "react";
import DogsStackComponent from "../components/DogsStackComponent";

function DogsPage({ isLoading, error, dogsData }) {
  return <DogsStackComponent dogsData={dogsData} />;
}

export default DogsPage;
