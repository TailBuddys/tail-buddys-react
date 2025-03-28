import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnackbar } from "../../providers/SnackbarProvider";

export default function useImages(initialForm, handleSubmit) {
  useAxios();
  const [data, setData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { snackbarActivation } = useSnackbar();

  const handleUploadImages = useCallback(
    async (imagesFromClient, entityId, entityType) => {
      setIsLoading(true);
      try {
        //   const createdDog = await createDog(normalizedDog); // API CALL
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation]
  );

  const validateImage = useCallback(async (file) => {
    if (file !== null) {
      return true;
    } else {
      return false;
    }
  }, []);

  const handleFileChange = (event, imageNum) => {
    const file = event.target.files[0]; // Get only the first file
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPG or PNG image."); // יהפוך לאלרט שלנו
        return "/assets/images/addImageIcon.png";
      }
      validateImage(file);

      const imageURL = URL.createObjectURL(file);
      console.log("Uploaded File:", file); //להעיף
      setData((prev) => ({
        ...prev,
        [`file${imageNum}`]: file,
      }));
      return imageURL;
    }
  };

  return {
    data,
    isLoading,
    error,
    handleUploadImages,
    validateImage,
    handleFileChange,
  };
}
