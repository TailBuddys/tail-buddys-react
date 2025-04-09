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
        <li
          style={{
            background: isSelected ? "#8a431b" : "#a88c66",
            width: 10,
            height: 10,
            borderRadius: "50%",
            display: "inline-block",
            margin: "0 5px",
            cursor: "pointer",
            boxShadow: "0 1.5px 3px rgba(0, 0, 0, 0.3)",
          }}
          onClick={onClickHandler}
          onKeyDown={onClickHandler}
          value={index}
          key={index}
          role="button"
          tabIndex={0}
          aria-label={`Slide ${index + 1} ${isSelected ? "(Selected)" : ""}`}
        />
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
          <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
            <CardMedia component="img" height="*" src={item} />
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
