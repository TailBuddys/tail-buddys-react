import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import CardComponent from "../../components/card/CardComponent";
import ParkDataToModel from "../helpers/initialForms/parkToModel";

function ParksCarouselComponent({ parksData, isLoading, error }) {
  console.log("this is parks");
  console.log(parksData);

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      transitionTime="300"
      renderIndicator={(
        onClickHandler,
        isSelected,
        index,
        label //לבדוק
      ) => (
        <button
          key={index}
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            margin: "0 5px",
            cursor: "pointer",
          }}
          aria-label={`Slide ${index + 1} ${isSelected ? "(Selected)" : ""}`}
        >
          {parksData.length > 1 ? (
            <img
              src="/assets/images/imageSelector.png"
              alt={`Indicator ${index}`}
              style={{
                width: isSelected ? "18px" : "15px",
                height: isSelected ? "18px" : "15px",
                opacity: isSelected ? 1 : 0.6,
                transition: "all 0.3s ease",
                filter: isSelected ? "none" : "grayscale(70%)",
                pointerEvents: "none",
              }}
            />
          ) : null}
        </button>
      )}
      renderArrowPrev={(onClickHandler, hasPrev, label) =>
        hasPrev && (
          <IconButton
            onClick={onClickHandler}
            title={label}
            sx={{
              position: "absolute",
              left: 0,
              top: "calc(50% - 20px)",
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
            onClick={onClickHandler}
            title={label}
            sx={{
              position: "absolute",
              right: 0,
              top: "calc(50% - 20px)",
              zIndex: 2,
            }}
          >
            <ArrowForwardIos />
          </IconButton>
        )
      }
    >
      {parksData ? (
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
            <CardComponent data={ParkDataToModel(item)} />
          </Box>
        ))
      ) : (
        <Typography>oops.. theres no parks to present </Typography>
      )}
    </Carousel>
  );
}

export default ParksCarouselComponent;
