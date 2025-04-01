import { useCallback, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnackbar } from "../../providers/SnackbarProvider";
import { uploadImage } from "../services/ImagesApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function useImages(initialForm) {
  useAxios();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { snackbarActivation } = useSnackbar();
  const initialImageRoot = "/assets/images/addImageIcon.png";
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const [imagePreview, setImagePreview] = useState({
    image1: initialImageRoot,
    image2: initialImageRoot,
    image3: initialImageRoot,
    image4: initialImageRoot,
    image5: initialImageRoot,
  });
  const [images, setImages] = useState({
    file1: null,
    file2: null,
    file3: null,
    file4: null,
    file5: null,
  });

  const handleUploadImages = useCallback(
    async (imagesFromClient, entityId, entityType) => {
      setIsLoading(true);
      try {
        Object.entries(imagesFromClient).forEach(([key, value]) => {
          if (value !== null) {
            uploadImage(value, entityId, entityType);
          }
        });
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
      navigate(ROUTES.EDIT_DOG);
    },
    [snackbarActivation, navigate]
  );

  const handleFileChange = (event, imageNum) => {
    const file = event.target.files[0]; // Get only the first file
    if (file) {
      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type. Please upload a JPG or PNG image."); // יהפוך לאלרט שלנו
        return;
      }
      const url = URL.createObjectURL(file);
      setImagePreview((prev) => ({ ...prev, [`image${imageNum}`]: url }));
      setImages((prev) => ({ ...prev, [`file${imageNum}`]: file }));
    }
  };

  const handleDeleteView = (imageNum) => {
    setImagePreview((prev) => ({
      ...prev,
      [`image${imageNum}`]: initialImageRoot,
    }));
    setImages((prev) => ({ ...prev, [`file${imageNum}`]: null }));
  };

  return {
    isLoading,
    error,
    images,
    imagePreview,
    setImages,
    handleUploadImages,
    handleDeleteView,
    handleFileChange,
  };
}
