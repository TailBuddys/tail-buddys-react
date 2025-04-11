import {
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UploadImagesComponent = ({
  imageNum,
  imagePreview,
  onImageChange,
  onRemoveImage,
}) => {
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
      sx={{ padding: 0, position: "relative", margin: 1 }}
    >
      <Card sx={{ width: 250, height: 250 }}>
        <CardMedia
          component="img"
          height="250"
          image={imagePreview}
          alt={`Uploaded image ${imageNum}`}
        />
        <VisuallyHiddenInput
          type="file"
          onChange={(event) => onImageChange(event, imageNum)}
        />
        <IconButton
          color="error"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.3)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={() => onRemoveImage(imageNum)}
        >
          <DeleteIcon />
        </IconButton>
        <Box
          sx={{
            position: "relative",
            bottom: 40,
            left: 10,
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "white",
            borderRadius: "50%",
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {imageNum}
        </Box>
      </Card>
    </Button>
  );
};

export default UploadImagesComponent;
