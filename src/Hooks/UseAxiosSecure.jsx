import axios from "axios";
import UseAuthhooks from '../Hooks/UseAuthhooks'
import { useNavigate } from "react-router-dom";

const UseAxiosSecure = () => {
  const { user, signOutUser } = UseAuthhooks();
  const navigate = useNavigate();

  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
  });

  //  Add request interceptor
  axiosSecure.interceptors.request.use(
    async (config) => {
      if (user) {
        // Get latest ID token from Firebase
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  //  Add response interceptor
  axiosSecure.interceptors.response.use(
    (res) => res,
    (error) => {
      const status = error.response?.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        signOutUser()
          .then(() => navigate("/login"))
          .catch(console.error);
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
