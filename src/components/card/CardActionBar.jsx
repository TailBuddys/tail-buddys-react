import { Box, Fab } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function CardActionBar({ data }) {
  return (
    <Box sx={{}}>
      {!data?.dogLikes ? (
        <>
          <Fab color="error" onClick={() => {}}>
            <ThumbDownAltIcon />
          </Fab>
          <Fab color="success" onClick={() => {}}>
            <FavoriteIcon />
          </Fab>
        </>
      ) : null}
    </Box>
  );
}

export default CardActionBar;
