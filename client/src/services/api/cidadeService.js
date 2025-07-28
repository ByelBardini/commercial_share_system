import { api, refresh } from "../api.js";

export async function buscarCidades() {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.get(`/cidade`);

    return response.data;
  } catch (err) {
    console.error("Erro ao buscar cidades:", err);
    throw new Error("Erro ao buscar cidades");
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
  } catch (err) {
    console.error("Erro ao favoritar cidade:", err);
    throw new Error("Erro ao favoritar ciades");
  }
}
