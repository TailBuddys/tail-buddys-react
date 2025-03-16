import axios from "axios";

const apiUrl = "https://localhost:7121/dog";

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

const createDog = async (dog) => {
  try {
    const { data } = await axios.post(apiUrl, dog);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getUserDogs = async () => {
  try {
    const { data } = await axios.get(`${apiUrl}/user`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDogById = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${id}`);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllDogs = async () => {
  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const getUnmatchedDogs = async (id, filters = {}) => {
  try {
    const queryParams = buildQueryParams(filters);
    const url = `${apiUrl}/match/${id}?${queryParams}`;

    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const updateDog = async (id, normalizedExistingDog) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${id}`, normalizedExistingDog);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const deleteDog = async (dogId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${dogId}`);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

export {
  createDog,
  getUserDogs,
  getDogById,
  getAllDogs,
  getUnmatchedDogs,
  updateDog,
  deleteDog,
};
