import { Box, Fab } from "@mui/material";
import React from "react";

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
            sx={{
              backgroundColor: "#cc6e61",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#b85a4e",
                boxShadow: "none",
              },
            }}
            onClick={() => {
              handleSwipeDog("dislike");
              handleLikeUnlikeDog(loginDog, data.id, false);
            }}
          >
            <img src="/assets/images/dislikeIcon.png" alt="like icon" />
          </Fab>
          <Fab
            sx={{
              backgroundColor: "#7ca982",
              color: "#fff",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#699172",
                boxShadow: "none",
              },
            }}
            onClick={() => {
              handleSwipeDog("like");
              handleLikeUnlikeDog(loginDog, data.id, true);
            }}
          >
            <img src="/assets/images/likeIcon.png" alt="like icon" />
          </Fab>
        </Box>
      ) : null}
    </Box>
  );
}

export default CardActionBar;
