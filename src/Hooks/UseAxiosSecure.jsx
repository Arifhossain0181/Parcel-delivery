import axios from "axios";

const UseAxiosSecure = () => {
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000", // must match backend port
  });
  return axiosSecure;
};

export default UseAxiosSecure;
