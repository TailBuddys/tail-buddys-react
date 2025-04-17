import { Box, Fab } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function CardActionBar({ data, handleSwipeDog, handleLikeUnlikeDog }) {
  return (
    <Box sx={{}}>
      {!data?.dogLikes ? (
        <>
          <Fab
            color="error"
            onClick={() => {
              handleSwipeDog("dislike");
            }}
          >
            <ThumbDownAltIcon />
          </Fab>
          <Fab
            color="success"
            onClick={() => {
              handleSwipeDog("like");
            }}
          >
            <FavoriteIcon />
          </Fab>
        </>
      ) : null}
    </Box>
  );
}

export default CardActionBar;
