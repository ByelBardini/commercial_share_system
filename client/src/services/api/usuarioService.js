import { api, refresh } from "../api.js";

export async function trocaSenhaUsuario(nova_senha) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/usuario/trocasenha`, { nova_senha });

    return response.data;
  }  catch (err) {
    console.error("Erro ao trocar senha:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao trocar senha");
  }
}
