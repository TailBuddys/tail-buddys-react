import UploadImagesComponent from "../../images/components/UploadImagesComponent";
import useImages from "../../images/hooks/useImages";
import UploadImagesForm from "../../images/components/UploadImagesForm";
import { Container } from "@mui/material";
import { useDog } from "../providers/DogProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useEffect } from "react";

const UploadDogImagesPage = () => {
  const navigate = useNavigate();
  const {
    images,
    imagePreview,
    handleUploadImages,
    handleFileChange,
    handleDeleteView,
  } = useImages();

  const { dog } = useDog();

  useEffect(() => {
    if (dog?.images?.length > 0) {
      navigate(ROUTES.EDIT_DOG);
    }
  }, [dog, navigate]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UploadImagesForm
        onSubmit={handleUploadImages}
        entityId={dog?.id}
        entityType={0}
        images={images}
        title={"Upload Images"}
        styles={{ maxWidth: "800px" }}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <UploadImagesComponent
            key={num}
            imageNum={num}
            onRemoveImage={handleDeleteView}
            imagePreview={imagePreview[`image${num}`.valueOf()]}
            onImageChange={handleFileChange}
          />
        ))}
      </UploadImagesForm>
    </Container>
  );
};

export default UploadDogImagesPage;
