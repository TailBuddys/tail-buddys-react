import axios from "axios";

const apiUrl = "https://localhost:7121/match";

// const buildQueryParams = (dogId) => {
//   const params = new URLSearchParams();

//   Object.entries(dogId).forEach(([key, value]) => {
//     if (value !== null && value !== undefined) {
//       if (Array.isArray(value)) {
//         value.forEach((v) => params.append(key, v));
//       } else {
//         params.append(key, value);
//       }
//     }
//   });

//   return params.toString();
// };

const createMatchInteraction = async (matchData) => {
  try {
    const { data } = await axios.post(apiUrl, matchData);
    return data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getAllMatches = async (id) => {
  try {
    const url = `${apiUrl}?dogId=${id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const updateMatch = async (id, matchData) => {
  try {
    const { data } = await axios.put(`${apiUrl}/${id}`, matchData);

    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const deleteMatch = async (matchId) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${matchId}`);
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

export { createMatchInteraction, getAllMatches, updateMatch, deleteMatch };
