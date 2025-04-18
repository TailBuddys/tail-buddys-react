import { Box, Fab } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function CardActionBar({
  data,
  handleSwipeDog,
  handleLikeUnlikeDog,
  loginDog,
}) {
  return (
    <Box sx={{}}>
      {!data?.dogLikes ? (
        <>
          <Fab
            color="error"
            onClick={() => {
              handleSwipeDog("dislike");
              handleLikeUnlikeDog(loginDog, data.id, false);
            }}
          >
            <ThumbDownAltIcon />
          </Fab>
          <Fab
            color="success"
            onClick={() => {
              handleSwipeDog("like");
              handleLikeUnlikeDog(loginDog, data.id, true);
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
