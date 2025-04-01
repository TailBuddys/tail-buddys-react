import UploadImagesComponent from "../../images/components/UploadImagesComponent";
import useImages from "../../images/hooks/useImages";
import UploadImagesForm from "../../images/components/UploadImagesForm";
// import Spinner from "../../components/Spinner";
import { getDogFromLocalStorage } from "../../services/localStorageService";

const UploadDogImagesPage = () => {
  const {
    images,
    imagePreview,
    handleUploadImages,
    handleFileChange,
    handleDeleteView,
  } = useImages();

  const currentDog = getDogFromLocalStorage();
  // if (!currentDog) {
  //   return <Spinner />;
  // }
  return (
    <UploadImagesForm
      onSubmit={handleUploadImages}
      entityId={currentDog}
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
  );
};

export default UploadDogImagesPage;
