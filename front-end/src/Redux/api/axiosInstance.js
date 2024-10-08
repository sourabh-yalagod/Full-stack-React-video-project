import axios from "axios";
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default axiosInstance;
