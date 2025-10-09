import axios from "axios";
import UseAuthhooks from '../Hooks/UseAuthhooks'
const UseAxiosSecure = () => {
  const {user} = UseAuthhooks()
  const axiosSecure = axios.create({
    baseURL: "http://localhost:3000", // must match backend port
  });
  // Add a request interceptor
axiosSecure.interceptors.request.use(function (config) {
   config.headers.Authorization =`Bearer ${user.accessToken}`
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
  
);

  return axiosSecure;
};

export default UseAxiosSecure;
