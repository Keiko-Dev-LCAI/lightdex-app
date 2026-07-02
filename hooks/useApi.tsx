import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

const createApi = () => {
  api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    withCredentials: true,
    withXSRFToken: true,
  });
};

export const useApi = () => {
  if (!api) createApi();

  return api;
};
