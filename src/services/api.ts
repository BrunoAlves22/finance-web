import { getCookie } from "cookies-next";
import axios from "axios";

export async function apiAxios() {
  const token = getCookie("__session");

  const response = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
}
