import { Button, Card, CardMedia, IconButton, styled } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import useImages from "../hooks/useImages";

const UploadImagesComponent = ({ imageNum }) => {
  const { handleFileChange } = useImages();
  const [imagePreview, setImagePreview] = useState(
    "/assets/images/addImageIcon.png"
  );

  const handleChange = (event) => {
    let url = handleFileChange(event, imageNum);
    setImagePreview(url);
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      sx={{ padding: 0 }}
    >
      <Card>
        <CardMedia
          sx={{ backgroundColor: "#868178" }}
          component="img"
          height="250"
          width="250"
          image={imagePreview}
          alt="lala"
        />
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => handleChange(event)}
        />
      </Card>
      <Card
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 40,
          width: 35,
          opacity: 0.4,
          borderRadius: "0px 4px 0px 4px",
          fontSize: 25,
        }}
      >
        {imageNum}
      </Card>
      <Card
        sx={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: 40,
          width: 35,
          opacity: 0.5,
          borderRadius: "4px 0px 4px 0px",
          fontSize: 25,
        }}
      />
      <IconButton
        color="error"
        size="large"
        sx={{
          position: "absolute",
          bottom: -7,
          right: -8,
        }}
        onClick={() => setImagePreview("/assets/images/addImageIcon.png")}
      >
        <DeleteIcon fontSize="inherit" />
      </IconButton>
    </Button>
  );
};

export default UploadImagesComponent;
