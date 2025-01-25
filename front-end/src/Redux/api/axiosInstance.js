// import axios from "axios";
// const token = localStorage.getItem("token");

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
//   withCredentials: true,
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: 'https://wonder-craft-server.onrender.com',
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance
