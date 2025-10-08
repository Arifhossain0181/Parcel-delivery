import axios from "axios";

const useAxios = () => {
    const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // must match backend port
  });
  return axiosInstance;
   
};

export default useAxios;