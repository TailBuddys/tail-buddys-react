import { CardMedia } from "@mui/material";
import React from "react";

function CardGalleryComponent({ data }) {
  return (
    // ליצור קרוסלה
    <CardMedia
      component="img"
      height="*"
      src="https://storage.googleapis.com/tail_buddys_bucket1/0_3_112efbf2-ff30-4455-989a-6d797d226161"
    />
  );
}

export default CardGalleryComponent;
