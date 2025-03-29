import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnackbar } from "../../providers/SnackbarProvider";

export default function useImages(initialForm) {
  useAxios();
  const [data, setData] = useState(initialForm);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { snackbarActivation } = useSnackbar();
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

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

  const validateImage = useCallback(
    async (file) => {
      if (file !== undefined) {
        if (!allowedTypes.includes(file.type)) {
          return true;
        } else {
          return false;
        }
      }
    },
    [allowedTypes]
  );

  const handleFileChange = (event, imageNum) => {
    const file = event.target.files[0]; // Get only the first file
    const name = `file${imageNum}`;
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPG or PNG image."); // יהפוך לאלרט שלנו
        return "/assets/images/addImageIcon.png";
      }
      validateImage(file);

      const imageURL = URL.createObjectURL(file);
      // console.log("Uploaded File:", file); //להעיף
      console.log(data);

      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
      console.log(data);

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
