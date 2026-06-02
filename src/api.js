// import axios from 'axios';
// import {API} from './utils/api'

// const api = axios.create({
//   baseURL: API,
//   timeout: 30000,
//   headers: { "Content-Type": "application/json" },
// });

// // Request interceptor — attach auth token if present
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('rb_token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.error ||
//       error.response?.data?.message ||
//       error.message ||
//       'Something went wrong';
//     return Promise.reject(new Error(message));
//   }
// );

// export default api;

import axios from "axios";
import { API } from "./utils/api";

const api = axios.create({
  baseURL: API,
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh", {
             withCredentials: true,
        });

        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("rb_user");

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;