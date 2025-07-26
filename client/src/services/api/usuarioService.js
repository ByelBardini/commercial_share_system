import { api, refresh } from "../api.js";

export async function trocaSenhaUsuario(nova_senha) {
  try {
    const response = await api.put(`/usuario/trocasenha`, {nova_senha });

    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          try {
            await refresh();
            const response = await api.put(`/usuario/trocasenha`, {nova_senha });

            return response.data;
          } catch (refreshErr) {
            console.error("Erro ao buscar token:", refreshErr);
            return { erro: true, mensagem: "Sessão inválida!" };
          }
        }
    console.error("Erro ao trocar senha:", err);
  }
}