import UploadImagesComponent from "../../images/components/UploadImagesComponent";
import useImages from "../../images/hooks/useImages";
import UploadImagesForm from "../../images/components/UploadImagesForm";
import { Container } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { useEffect } from "react";
import Spinner from "../../components/Spinner";
import Error from "../../components/Error";
import { getUser } from "../../services/localStorageService";

const UploadParkImagesPage = () => {
  const navigate = useNavigate();
  const {
    isLoading,
    error,
    images,
    imagePreview,
    handleUploadImages,
    handleFileChange,
    handleDeleteView,
  } = useImages();

  useEffect(() => {
    const user = getUser();
    if (!user || user.IsAdmin === "False") {
      return navigate(ROUTES.ROOT);
    }
  }, [navigate]);
  const { id } = useParams();

  if (isLoading) return <Spinner />;
  if (error) return <Error />;
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <UploadImagesForm
        onSubmit={handleUploadImages}
        entityId={id}
        entityType={1}
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

export default UploadParkImagesPage;
