import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://localhost:7273/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động gắn token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // 🔹 Nếu chưa có headers thì khởi tạo nó
    if (!config.headers) {
      config.headers = {};
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
