import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL || "https://videotube-auro.onrender.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true,
});

export default axiosInstance;
