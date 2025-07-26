import { api, refresh } from "../api.js";

export async function buscarCidades() {
  try {
    const response = await api.get(`/cidade`);

    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.get(`/cidade`);
        return response.data;
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao buscar cidades:", err);
    return { erro: true, mensagem: "Erro ao buscar cidades." };
  }
}

export async function favoritarCidade(cidade_id) {
  try {
    const response = await api.put(`/cidade/favorita/${cidade_id}`);
    
    if(response){
      return{
        erro: false,
        mensagem: response.data?.message || "cidade favoritada/desfavoritada com sucesso!",
      }
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.put(`/cidade/favorita/${cidade_id}`);
        if(response){
          return{
            erro: false,
            mensagem: response.data?.message || "cidade favoritada/desfavoritada com sucesso!",
          }
        }
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao favoritar cidade:", err);
    return { erro: true, mensagem: "Erro ao favoritar cidades." };
  }
}
