import React from "react";
import { useDrop, useDrag } from "react-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Card, CardMedia, IconButton } from "@mui/material";

function ImageCard({
  image,
  entityId,
  entityType,
  index,
  onDelete,
  moveImage,
  hoveredIndex,
  setHoveredIndex,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: "IMAGE",
    item: { index, image },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "IMAGE",
    hover: (item) => {
      if (item.index !== index) {
        setHoveredIndex(index);
      }
    },
    drop: (item) => {
      if (item.index !== index) {
        moveImage(item.image.id, image.id, entityId, entityType);
        item.index = index;
      }
      setHoveredIndex(null);
    },
  });
  const isHovered = hoveredIndex === index;

  return (
    <Box
      ref={(node) => drag(drop(node))}
      sx={{
        opacity: isDragging || isHovered ? 0.5 : 1,
        cursor: "move",
        position: "relative",
        margin: 1,
      }}
    >
      <Card sx={{ width: 250, height: 250 }}>
        <CardMedia
          component="img"
          height="250"
          image={image.url}
          alt={`Uploaded image ${index + 1}`}
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
          onClick={() => onDelete(image.id, entityId, entityType)}
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
          {index + 1}
        </Box>
      </Card>
    </Box>
  );
}

export default ImageCard;
