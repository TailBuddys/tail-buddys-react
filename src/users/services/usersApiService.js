import axios from "axios";
import { getTokenFromLocalStorage } from "./localStorageService";

// const apiUrl = "https://localhost:7200/users";
const apiUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users";

const loginService = async (userLogin) => {
  const sortedAttempts = localStorage.getItem(
    `loginAttempts_${userLogin.email}`
  );
  const attempts = sortedAttempts
    ? JSON.parse(sortedAttempts)
    : { count: 0, firstAttemptTime: null };

  const currentTime = new Date().getTime();
  const oneDay = 24 * 60 * 60 * 1000;

  if (attempts.count >= 3 && currentTime - attempts.firstAttemptTime < oneDay) {
    throw new Error("This User is blocked. Please try again later.");
  }
  try {
    const response = await axios.post(`${apiUrl}/login`, userLogin);
    localStorage.removeItem(`loginAttempts_${userLogin.email}`);
    return response.data;
  } catch (error) {
    if (
      attempts.count === 0 ||
      currentTime - attempts.firstAttemptTime >= oneDay
    ) {
      attempts.count = 1;
      attempts.firstAttemptTime = currentTime;
    } else {
      attempts.count += 1;
    }
    localStorage.setItem(
      `loginAttempts_${userLogin.email}`,
      JSON.stringify(attempts)
    );
    throw new Error(error.response.data);
  }
};

const signUpService = async (user) => {
  try {
    const { response } = await axios.post(apiUrl, user);
    return response;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const getUserData = async (id) => {
  try {
    const { data } = await axios.get(`${apiUrl}/${id}`, {
      headers: {
        Authorization: getTokenFromLocalStorage(),
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (id, normalizedExistingUser) => {
  try {
    const { data } = await axios.put(
      `${apiUrl}/${id}`,
      normalizedExistingUser,
      {
        headers: {
          Authorization: getTokenFromLocalStorage(),
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const getAllUsers = async () => {
  try {
    const { data } = await axios.get(apiUrl, {
      headers: {
        Authorization: getTokenFromLocalStorage(),
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const updateUserBusinessStatus = async (id) => {
  try {
    const { data } = await axios.patch(
      `${apiUrl}/${id}`,
      {},
      {
        headers: {
          Authorization: getTokenFromLocalStorage(),
        },
      }
    );
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${apiUrl}/${id}`, {
      headers: {
        Authorization: getTokenFromLocalStorage(),
      },
    });
    return data;
  } catch (error) {
    throw new Error(error.message.data);
  }
};

export {
  loginService,
  signUpService,
  getUserData,
  updateUser,
  getAllUsers,
  updateUserBusinessStatus,
  deleteUser,
};
