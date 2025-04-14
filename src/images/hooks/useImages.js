import { useCallback, useMemo, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { useSnackbar } from "../../providers/SnackbarProvider";
import {
  uploadImage,
  deletImage,
  reorderImages,
} from "../services/ImagesApiService";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";

export default function useImages(initialForm) {
  useAxios();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const { snackbarActivation } = useSnackbar();
  const initialImageRoot = "/assets/images/addImageIcon.png";
  const [imageData, setImageData] = useState();
  const allowedTypes = useMemo(
    () => ["image/jpeg", "image/png", "image/jpg"],
    []
  );
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
        const imagesToUpload = Object.values(imagesFromClient).filter(
          (image) => image !== null
        );
        for (const image of imagesToUpload) {
          await uploadImage(image, entityId, entityType);
        }
        if (entityType === 1) {
          navigate(ROUTES.ROOT);
        } else {
          navigate(ROUTES.EDIT_DOG);
        }
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      } finally {
        setIsLoading(false);
      }
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

  const handleUploadOneImage = useCallback(
    async (imageFromClient, entityId, entityType) => {
      if (imageFromClient) {
        if (!allowedTypes.includes(imageFromClient.type)) {
          alert("Invalid file type. Please upload a JPG or PNG image."); // יהפוך לאלרט שלנו
          return;
        }
      }
      setIsLoading(true);
      try {
        if (imageFromClient !== null) {
          const response = await uploadImage(
            imageFromClient,
            entityId,
            entityType
          );
          setImageData(response);
        }
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation, allowedTypes]
  );

  const handleDeleteImage = useCallback(
    async (imageId, entityId, entityType) => {
      setIsLoading(true);
      try {
        if (imageId !== null) {
          const response = await deletImage(imageId, entityId, entityType);
          setImageData(response);
        }
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation]
  );

  const handleReorderImages = useCallback(
    async (imageId1, imageId2, entityId, entityType) => {
      setIsLoading(true);
      try {
        if (imageId1 !== null && imageId2 !== null) {
          const response = await reorderImages(
            imageId1,
            imageId2,
            entityId,
            entityType
          );
          setImageData(response);
        }
      } catch (error) {
        setError(error.message);
        snackbarActivation("error", error.message, "filled");
      }
      setIsLoading(false);
    },
    [snackbarActivation]
  );

  return {
    isLoading,
    error,
    images,
    imagePreview,
    imageData,
    setImageData,
    setImages,
    handleUploadImages,
    handleDeleteView,
    handleUploadOneImage,
    handleFileChange,
    handleDeleteImage,
    handleReorderImages,
  };
}
