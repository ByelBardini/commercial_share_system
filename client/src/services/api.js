import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function refresh() {
  try {
    const response = await api.get("/valida");
    return { ok: true, data: response.data };
  } catch (err) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      console.warn("Sessão inválida durante validação.");
      return { ok: false };
    }
    console.error("Erro ao validar sessão:", err);
    return { ok: false };
  }
}
