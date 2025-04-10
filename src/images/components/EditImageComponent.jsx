import { useCallback } from "react";
import { useDrop, useDrag } from "react-dnd";
import {
  Card,
  CardMedia,
  IconButton,
  Button,
  styled,
  Box,
  CircularProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageCard = ({ image, index, onDelete, moveImage }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item) => {
      if (item.index !== index) {
        moveImage(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <Box
      ref={(node) => drag(drop(node))}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        position: "relative",
        margin: 1,
      }}
    >
      <Card sx={{ width: 250, height: 250 }}>
        <CardMedia
          component="img"
          height="250"
          image={image}
          alt={`Uploaded image ${index + 1}`}
        />
        <IconButton
          color="error"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={() => onDelete(image.id)}
        >
          <DeleteIcon />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
            borderRadius: "50%",
            width: 30,
            height: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {index + 1}
        </Box>
      </Card>
    </Box>
  );
};

const UploadButton = ({ onUpload, loading }) => {
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
      e.target.value = ""; // Reset input to allow uploading same file again
    }
  };

  return (
    <Button
      component="label"
      variant="contained"
      startIcon={loading ? <CircularProgress size={24} /> : <CloudUploadIcon />}
      disabled={loading}
      sx={{ height: 250, width: 250, margin: 1 }}
    >
      Upload Image
      <VisuallyHiddenInput
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </Button>
  );
};

const EditImageComponent = ({
  images,
  onUpload,
  onDelete,
  onReorder,
  loading,
}) => {
  const moveImage = useCallback(
    (dragIndex, hoverIndex) => {
      onReorder(dragIndex, hoverIndex);
    },
    [onReorder]
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        minHeight: 300,
      }}
    >
      {images &&
        images.map((image, index) => (
          <ImageCard
            key={image.id}
            image={image}
            index={index}
            onDelete={onDelete}
            moveImage={moveImage}
          />
        ))}
      <UploadButton onUpload={onUpload} loading={loading} />
    </Box>
  );
};

export default EditImageComponent;
