import axios from "axios";

// const API_BASE_URL = "http://localhost:5000";

const API_URL="https://api.codewithzosh.tech"

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/auth/reset-password",
  ];

  const isPublic = publicRoutes.some((route) => config.url?.startsWith(route));

  if (!isPublic) {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return config;
});

export default api;
