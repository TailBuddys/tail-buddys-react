import axios from "axios";
import { useEffect } from "react";
import { useUser } from "../users/providers/UserProvider";
import { useSnackbar } from "../providers/SnackbarProvider";

export default function useAxios() {
  const { token } = useUser();
  const snackbarActivation = useSnackbar();

  useEffect(() => {
    axios.defaults.headers.common["x-auth-token"] = token;
    // axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const requestInterceptor = axios.interceptors.request.use((data) => {
      console.log("request out");
      return Promise.resolve(data);
    });

    const responseInterceptor = axios.interceptors.response.use(
      null,
      (error) => {
        if (error.message) snackbarActivation("error", error.message);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [token, snackbarActivation]);
}
