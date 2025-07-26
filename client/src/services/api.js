import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function refresh(){
  const response = await api.get("/refresh")

  return response;
}
