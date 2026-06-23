import axios from "axios";
import { environment } from "../enviroment";

const api = axios.create({
  baseURL: environment.apiUrl
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");

  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }

  return config;
});

export default api;