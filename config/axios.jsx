import axios from "axios";
import { auth, user } from "./url";

export const authInstance = axios.create({
  baseURL: auth,
  headers: {
    Accept: "application/json",
  },
});

export const userInstance = (token) => {
  return axios.create({
    baseURL: user,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
