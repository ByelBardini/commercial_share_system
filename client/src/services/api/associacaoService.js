const URL = `http://localhost:3000/associacao`;

export async function getAssociacoesPorCidade(id_cidade) {
  try {
    const response = await fetch(`${URL}/cidade/${id_cidade}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Falha ao buscar associações");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar associação:", err);
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
    const response = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        associacao_cidade_id,
        associacao_nome,
        associacao_nome_fantasia,
        associacao_cnpj,
        associacao_data_contato,
        associacao_data_fechamento,
        associacao_observacao,
        associacao_cliente,
      }),
    });
    let data = null;
    try {
      data = await response.json();
    } catch (jsonErr) {
      console.warn("Erro ao converter resposta em JSON:", jsonErr);
      data = {};
    }

    if (!response.ok) {
      return {
        erro: true,
        mensagem: data?.error || "Falha ao cadastrar empresa",
      };
    }

    return {
      erro: false,
      mensagem: data?.message || "Empresa cadastrada com sucesso!",
    };
  } catch (err) {
    console.error("Erro ao cadastrar associação:", err);
    return { erro: true, mensagem: "Erro de conexão com o servidor" };
  }
}

export async function getAssociacaoFull(associacao_id) {
  try {
    const response = await fetch(`${URL}/${associacao_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Falha ao buscar associação");
    }

    const dados = (await response).json();
    return dados;
  } catch (err) {
    console.error("Erro ao buscar associação:", err);
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
    const response = await fetch(`${URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        associacao_nome,
        associacao_nome_fantasia,
        associacao_cnpj,
        associacao_data_contato,
        associacao_data_fechamento,
        associacao_observacao,
        associacao_cliente,
        associacao_preco_placa,
        associacao_preco_instalacao,
      }),
    });
    let data;
    try {
      data = await response.json();
    } catch (jsonErr) {
      console.warn("Erro ao converter resposta em JSON:", jsonErr);
      data = {};
    }

    if (!response.ok) {
      return { erro: true, mensagem: data?.error || "Falha ao editar empresa" };
    }

    return {
      erro: false,
      mensagem: data?.message || "Empresa editada com sucesso!",
    };
  } catch (err) {
    console.error("Erro ao editar associação:", err);
    return { erro: true, mensagem: "Erro de conexão com o servidor" };
  }
}

export async function deletaAssociacao(id) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Falha ao deletar associação");
    }

    await response;
  } catch (err) {
    console.error("Erro ao buscar associação:", err);
  }
}
