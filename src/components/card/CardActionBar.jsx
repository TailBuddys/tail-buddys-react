import { Box, Fab } from "@mui/material";
import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";

function CardActionBar() {
  return (
    <Box>
      <Fab color="error" onClick={() => {}}>
        <ThumbDownAltIcon />
      </Fab>
      <Fab color="success" onClick={() => {}}>
        <FavoriteIcon />
      </Fab>
    </Box>
  );
}

export default CardActionBar;
