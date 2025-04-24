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
    <Box>
      {!data?.dogLikes ? (
        <Box>
          <Fab
            color="error"
            sx={{
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            onClick={() => {
              handleSwipeDog("dislike");
              handleLikeUnlikeDog(loginDog, data.id, false);
            }}
          >
            <ThumbDownAltIcon />
          </Fab>
          <Fab
            color="success"
            sx={{
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
            onClick={() => {
              handleSwipeDog("like");
              handleLikeUnlikeDog(loginDog, data.id, true);
            }}
          >
            <FavoriteIcon />
          </Fab>
        </Box>
      ) : null}
    </Box>
  );
}

export default CardActionBar;
