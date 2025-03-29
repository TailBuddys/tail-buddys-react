import React from "react";
import UploadImagesComponent from "../../images/components/UploadImagesComponent";
import useImages from "../../images/hooks/useImages";
import UploadImagesForm from "../../images/components/UploadImagesForm";
import initialUploadImagesForm from "../../images/helpers/initialForms/initialUploadImagesForm";

const UploadDogImagesPage = () => {
  const { handleUploadImages, validateImage } = useImages(
    initialUploadImagesForm
  );
  return (
    <UploadImagesForm
      onSubmit={handleUploadImages}
      validateImage={validateImage()}
      title={"Upload Images"}
      styles={{ maxWidth: "800px" }}
    >
      <UploadImagesComponent imageNum={1} />
      <UploadImagesComponent imageNum={2} />
      <UploadImagesComponent imageNum={3} />
      <UploadImagesComponent imageNum={4} />
    </UploadImagesForm>
  );
};

export default UploadDogImagesPage;
