import { useState } from "react";
import { Box } from "@mui/material";
import ImageCard from "./imageProperty/ImageCard";
import UploadImageButton from "./imageProperty/UploadImageButton";
import Spinner from "../../components/Spinner";

const EditImageComponent = ({
  images,
  entityId,
  entityType,
  isLoading,
  onUpload,
  onDelete,
  onReorder,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (isLoading) return <Spinner />;
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
            entityId={entityId}
            entityType={entityType}
            index={index}
            onDelete={onDelete}
            moveImage={onReorder}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      {images.length < 5 && (
        <UploadImageButton
          onUpload={onUpload}
          loading={isLoading}
          entityId={entityId}
          entityType={entityType}
        />
      )}
    </Box>
  );
};

export default EditImageComponent;
