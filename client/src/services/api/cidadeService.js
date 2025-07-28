import { api, refresh } from "../api.js";

export async function buscarCidades() {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.get(`/cidade`);

    return response.data;
  }  catch (err) {
    console.error("Erro ao buscar cidade:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao buscar cidade");
  }
}

export async function favoritarCidade(cidade_id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/cidade/favorita/${cidade_id}`);

    if (response) {
      return {
        erro: false,
        mensagem:
          response.data?.message ||
          "cidade favoritada/desfavoritada com sucesso!",
      };
    }
  }  catch (err) {
    console.error("Erro ao favoritar cidade:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao favoritar cidade");
  }
}