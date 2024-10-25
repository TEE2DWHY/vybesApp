import axios from "axios";
import { auth, user } from "./url";

export const authInstance = axios.create({
  baseURL: auth,
  headers: {
    Accept: "application/json",
  },
});

export const userInstance = (token) => {
  const headers = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return axios.create({
    baseURL: user,
    headers,
  });
};
