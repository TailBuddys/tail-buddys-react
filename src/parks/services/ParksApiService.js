import axios from "axios";

const apiUrl = "https://localhost:7121/park";

const buildQueryParams = (filters) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    }
  });

  return params.toString();
};

const createPark = async (park) => {
  try {
    const { data } = await axios.post(apiUrl, park);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getParkById = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllParks = async (id = null, filters = {}) => {
  // התאמות בבאק לקבל פילטרים
  try {
    const queryParams = buildQueryParams(filters);
    if (id !== null) {
      const url = `${apiUrl}/dog/${id}?${queryParams}`;
      const { data } = await axios.get(url);
      return data;
    } else {
      const url = `${apiUrl}?${queryParams}`;
      const { data } = await axios.get(url);
      return data;
    }
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const updatePark = async (id, normalizedExistingPark) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${id}`, normalizedExistingPark);

    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const deletePark = async (parkId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${parkId}`);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const likeUnlikePark = async (parkId, dogId) => {
  try {
    const { data } = await axios.post(`${apiUrl}/${parkId}`, dogId, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

export {
  createPark,
  getParkById,
  getAllParks,
  updatePark,
  deletePark,
  likeUnlikePark,
};
