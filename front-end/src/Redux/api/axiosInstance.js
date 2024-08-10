import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000", 
  baseURL: "https://videotube-auro.onrender.com", 
  withCredentials: true,
});
  
export default axiosInstance;
