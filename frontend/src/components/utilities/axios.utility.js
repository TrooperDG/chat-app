import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true, // 🔐 this allows cookies to be sent
});
