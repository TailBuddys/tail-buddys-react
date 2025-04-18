import { Box } from "@mui/material";
import React, { useState } from "react";
import CardComponent from "../../components/card/CardComponent";
import DogDataToModel from "../helpers/initialForms/dogToModel";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";

const DogsStackComponent = ({
  dogsData,
  isLoading,
  error,
  handleLikeUnlikeDog,
}) => {
  const [currentCards, setCurrentCards] = useState(dogsData);
  const [swipeDirection, setSwipeDirection] = useState(null);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);

    setTimeout(() => {
      setCurrentCards((prevCards) => prevCards.slice(1));
      setSwipeDirection(null);
    }, 300);
  };

  if (currentCards?.length === 0) {
    return <div className="no-cards">No more cards</div>; // לשנות
  }

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Box
      className="card-stack-container"
      sx={{ display: "flex", justifyContent: "center" }}
    >
      {currentCards?.map((dog, index) => {
        const isTopCard = index === 0;
        const cardClass = isTopCard ? `card ${swipeDirection || ""}` : "card";

        const zIndex = currentCards.length - index;

        return (
          <Box key={dog.id} className={cardClass} sx={{ zIndex: zIndex }}>
            <CardComponent
              data={DogDataToModel(dog)}
              handleLikeUnlikeDog={handleLikeUnlikeDog}
              handleSwipeDog={handleSwipe}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default DogsStackComponent;
