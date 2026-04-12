import axios from "axios";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// ✅ Request interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ✅ Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("token");

      await Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account has been blocked by admin",
        timer: 4000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;