import { Box, Typography } from "@mui/material";
import MatchCompponent from "./MatchCompponent";
import Slider from "react-slick";

const MatchScreenComponent = ({
  handleUnmatch,
  handleCreateChat,
  matches,
  notifications,
}) => {
  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 10,
    slidesToScroll: 2,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 426,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 361,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        backgroundColor: "var(--varodi)",
        width: "50vw",
        height: "89px",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {(matches ?? []).length > 0 ? (
        <Box sx={{ width: "100%" }}>
          <Slider {...settings}>
            {matches.map((match, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <MatchCompponent
                  handleUnmatch={handleUnmatch}
                  match={match}
                  handleCreateChat={handleCreateChat}
                  notifications={notifications}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ textAlign: "center" }}>
            You have no new matches 😭
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MatchScreenComponent;
