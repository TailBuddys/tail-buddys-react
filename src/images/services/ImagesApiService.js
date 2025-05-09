import axios from "axios";

const apiUrl = "https://localhost:7121/Image";

const buildQueryParams = (params) => {
  return new URLSearchParams(params).toString();
};

const uploadImage = async (image, entityId, entityType) => {
  try {
    const queryParams = buildQueryParams({ entityId, entityType });
    const url = `${apiUrl}?${queryParams}`;

    const formData = new FormData();
    formData.append("file", image);

    const { data } = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.response?.data || "Upload failed");
  }
};

const deletImage = async (imageId, entityId, entityType) => {
  try {
    const queryParams = buildQueryParams({ imageId, entityId, entityType });
    const url = `${apiUrl}?${queryParams}`;

    const { data } = await axios.delete(url);
    return data;
  } catch (error) {
    throw new Error(error.response?.data || "Delete failed");
  }
};

const reorderImages = async (imageId1, imageId2, entityId, entityType) => {
  try {
    const queryParams = buildQueryParams({
      imageId1,
      imageId2,
      entityId,
      entityType,
    });
    const url = `${apiUrl}?${queryParams}`;

    const { data } = await axios.put(url);
    return data;
  } catch (error) {
    throw new Error(error.response?.data || "Reorder has been failed");
  }
};

export { uploadImage, deletImage, reorderImages };
