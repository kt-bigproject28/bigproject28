/* api 연결 */

import axios from "axios";

export const instance = axios.create({
  timeout: 5000,
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});
