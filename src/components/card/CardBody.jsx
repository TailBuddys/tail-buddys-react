import React from "react";
import DogDetailsComponent from "../../dogs/pages/DogDetailsComponent";

function CardBody({ data }) {
  return (
    <div style={{ maxHeight: "500px", overflowY: "auto" }}>
      <DogDetailsComponent dogData={data} />
    </div>
  );
}

export default CardBody;
