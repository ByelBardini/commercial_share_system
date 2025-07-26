import { api, refresh } from "../api.js";

export async function getAssociacoesPorCidade(id_cidade) {
  try {
    const response = await api.get(`/associacao/cidade/${id_cidade}`);

    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.get(`/associacao/cidade/${id_cidade}`);
        return response.data;
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao buscar empresa:", err);
    return { erro: true, mensagem: "Erro ao buscar empresas." };
  }
}

export async function postAssociacao(
  associacao_cidade_id,
  associacao_nome,
  associacao_nome_fantasia,
  associacao_cnpj,
  associacao_data_contato,
  associacao_data_fechamento,
  associacao_observacao,
  associacao_cliente
) {
  try {
    const response = await api.post(`/associacao`, {
        associacao_cidade_id,
        associacao_nome,
        associacao_nome_fantasia,
        associacao_cnpj,
        associacao_data_contato,
        associacao_data_fechamento,
        associacao_observacao,
        associacao_cliente,
      });
    
    if(response){
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa cadastrada com sucesso!",
      };
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          try {
            await refresh();
            const response = await api.post(`/associacao`, {
              associacao_cidade_id,
              associacao_nome,
              associacao_nome_fantasia,
              associacao_cnpj,
              associacao_data_contato,
              associacao_data_fechamento,
              associacao_observacao,
              associacao_cliente,
            });;
            if(response){
              return {
                erro: false,
                mensagem: response.data?.message || "Empresa cadastrada com sucesso!",
              };
            }
          } catch (refreshErr) {
            console.error("Erro ao buscar token:", refreshErr);
            return { erro: true, mensagem: "Sessão inválida!" };
          }
        }
    console.error("Erro ao cadastrar associação:", err);
    return { erro: true, mensagem: "Erro de conexão com o servidor" };
  }
}

export async function getAssociacaoFull(associacao_id) {
  try {
    const response = await api.get(`/associacao/${associacao_id}`);
    
    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.get(`/associacao/${associacao_id}`);
        return response.data;
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao buscar empresa:", err);
    return { erro: true, mensagem: "Erro ao buscar empresa" };
  }
}

export async function putAssociacao(
  associacao_nome,
  associacao_nome_fantasia,
  associacao_cnpj,
  associacao_data_contato = null,
  associacao_data_fechamento = null,
  associacao_observacao,
  associacao_preco_placa,
  associacao_preco_instalacao,
  associacao_cliente,
  id
) {
  try {
    const response = await api.put(`/associacao/${id}`, {
        associacao_nome,
        associacao_nome_fantasia,
        associacao_cnpj,
        associacao_data_contato,
        associacao_data_fechamento,
        associacao_observacao,
        associacao_cliente,
        associacao_preco_placa,
        associacao_preco_instalacao,
    });
    
    if(response){
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa editada com sucesso!",
      };
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await await api.put(`/associacao/${id}`, {
          associacao_nome,
          associacao_nome_fantasia,
          associacao_cnpj,
          associacao_data_contato,
          associacao_data_fechamento,
          associacao_observacao,
          associacao_cliente,
          associacao_preco_placa,
          associacao_preco_instalacao,
      });
        if(response){
          return {
            erro: false,
            mensagem: response.data?.message || "Empresa editada com sucesso!",
          };
        }
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao editar associação:", err);
    return { erro: true, mensagem: "Erro de conexão com o servidor" };
  }
}

export async function favoritarAssociacao(id){
  try {
    const response = await api.put(`/associacao/favorita/${id}`);

    if(response){
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa favoritada/desfavoritada com sucesso!",
      };
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.put(`/associacao/favorita/${id}`);
        if(response){
          return {
            erro: false,
            mensagem: response.data?.message || "Empresa favoritada/desfavoritada com sucesso!",
          };
        }
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao favoritar/desfavoritar associação:", err);
    return { erro: true, mensagem: "Erro de conexão com o servidor" };
  }
}

export async function deletaAssociacao(id) {
  try {
    const response = await api.delete(`/associacao/${id}`);
    
    if(response){
      return{
        erro: false,
        mensagem: response.data?.message || "Empresa deletada com sucesso!",
      }
    }
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.delete(`/associacao/${id}`);
        if(response){
          return {
            erro: false,
            mensagem: response.data?.message || "Empresa deletada com sucesso!",
          };
        }
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    console.error("Erro ao deletar empresa:", err);
  }
}
