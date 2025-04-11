import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, CardMedia, IconButton } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function CardGalleryComponent({ data }) {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      transitionTime="300"
      renderIndicator={(onClickHandler, isSelected, index, label) => (
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
          <img
            src="assets/images/imageSelector.png"
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
      {(data.images ?? []).length > 0 ? (
        data.images.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              height: "100%",
              width: "100%",
            }}
          >
            <CardMedia
              component="img"
              src={item.url}
              sx={{
                width: "100%",
                height: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Box>
        ))
      ) : (
        <CardMedia
          component="img"
          height="*"
          src={
            data.vaccinated !== undefined
              ? "assets/images/noDogImage.png"
              : "assets/images/noParkImage.png"
          }
        />
      )}
    </Carousel>
  );
}

export default CardGalleryComponent;
