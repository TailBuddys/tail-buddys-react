import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import CardComponent from "../../components/card/CardComponent";
import ParkDataToModel from "../helpers/initialForms/parkToModel";
import useParks from "../hooks/useParks";

function ParksCarouselComponent({
  parksData,
  isLoading,
  error,
  setPresentedPark,
  presentedPark,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { handleLikeUnlikePark } = useParks();

  useEffect(() => {
    if (presentedPark && parksData) {
      const newIndex = parksData.findIndex(
        (park) => park.id === presentedPark.id
      );
      if (newIndex !== -1) {
        setCurrentSlide(newIndex);
      }
    }
  }, [presentedPark, parksData]);

  const handlePrevClick = (onClickHandler) => {
    onClickHandler();
    const newIndex =
      currentSlide === 0 ? parksData.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
    setPresentedPark(parksData[newIndex]);
  };

  const handleNextClick = (onClickHandler) => {
    onClickHandler();
    const newIndex =
      currentSlide === parksData.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
    setPresentedPark(parksData[newIndex]);
  };

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setPresentedPark(parksData[index]);
  };

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      transitionTime="300"
      selectedItem={currentSlide}
      style={{
        marginBottom: "50px", ////////////////
      }}
      renderIndicator={(
        onClickHandler,
        isSelected,
        index,
        label //לבדוק
      ) => (
        <button
          key={index}
          onClick={(e) => {
            onClickHandler(e);
            handleSlideChange(index);
          }}
          onKeyDown={onClickHandler}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            margin: "0 5px",
            cursor: "pointer",
          }}
          aria-label={`Slide ${index + 1} ${isSelected ? "(Selected)" : ""}`}
        ></button>
      )}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <IconButton
            onClick={() => handlePrevClick(onClickHandler)}
            title={label}
            sx={{
              position: "absolute",
              left: 0,
              top: "calc(60% - 20px)",
              zIndex: 2,
            }}
          >
            <ArrowBackIos />
          </IconButton>
        )
      }
      renderArrowNext={(onClickHandler, hasNext, label) =>
        hasNext && (
          <IconButton
            onClick={() => handleNextClick(onClickHandler)}
            title={label}
            sx={{
              position: "absolute",
              right: 0,
              top: "calc(60% - 20px)",
              zIndex: 2,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        )
      }
    >
      {parksData?.length > 0 ? (
        parksData.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CardComponent
              data={ParkDataToModel(item)}
              handleLikeUnlikePark={handleLikeUnlikePark}
            />
          </Box>
        ))
      ) : (
        <Typography>oops.. theres no parks to present </Typography>
      )}
    </Carousel>
  );
}

export default ParksCarouselComponent;
