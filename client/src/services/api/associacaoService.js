import { api, refresh } from "../api.js";

export async function getAssociacoesPorCidade(id_cidade) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.get(`/associacao/cidade/${id_cidade}`);

    return response.data;
  }  catch (err) {
    console.error("Erro ao buscar empresa:", err);
    if (err.response && err.response.data && err.response.data.error) {
      throw new Error(err.response.data.error);
    }
    throw new Error("Erro ao buscar empresa");
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
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

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

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa cadastrada com sucesso!",
      };
    }
  }  catch (err) {
    console.error("Erro ao cadastrar empresa:", err);
    if (err.message.includes("Sessão inválida")) {
      throw err;
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Sessão inválida");
    }

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Erro ao cadastrar empresa");
  }
}

export async function getAssociacaoFull(associacao_id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.get(`/associacao/${associacao_id}`);

    return response.data;
  }  catch (err) {
    console.error("Erro ao buscar empresa:", err);
    if (err.message.includes("Sessão inválida")) {
      throw err;
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Sessão inválida");
    }

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Erro ao buscar empresa");
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
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

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

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa editada com sucesso!",
      };
    }
  } catch (err) {
    console.error("Erro ao editar empresa:", err);
    if (err.message.includes("Sessão inválida")) {
      throw err;
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Sessão inválida");
    }

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Erro ao editar empresa");
  }
}

export async function favoritarAssociacao(id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.put(`/associacao/favorita/${id}`);

    if (response) {
      return {
        erro: false,
        mensagem:
          response.data?.message ||
          "Empresa favoritada/desfavoritada com sucesso!",
      };
    }
  }  catch (err) {
    console.error("Erro ao favoritar empresa:", err);
    if (err.message.includes("Sessão inválida")) {
      throw err;
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Sessão inválida");
    }

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }

    throw new Error("Erro ao favoritar empresa");
  }
}

export async function deletaAssociacao(id) {
  try {
    const validouSessao = await refresh();

    if (!validouSessao.ok) {
      throw new Error("Sessão inválida");
    }

    const response = await api.delete(`/associacao/${id}`);

    if (response) {
      return {
        erro: false,
        mensagem: response.data?.message || "Empresa deletada com sucesso!",
      };
    }
  }  catch (err) {
    console.error("Erro ao deletar associação:", err);
    if (err.message.includes("Sessão inválida")) {
      throw err;
    }

    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Sessão inválida");
    }

    if (err.response?.data?.error) {
      throw new Error(err.response.data.error);
    }
    
    throw new Error("Erro ao deletar empresa");
  }
}