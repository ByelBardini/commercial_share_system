import { api, refresh } from "../api.js";

function manterArray(valor) {
  if (Array.isArray(valor)) return valor;
  if (valor == null) return [];
  return [valor];
}

function separaContatos(contatosAntigos, contatosNovos) {
  const idsOriginais = new Set(contatosAntigos.map((c) => c.contato_id));

  const adicionados = contatosNovos
    .filter(
      (c) =>
        !idsOriginais.has(c.contato_id) && c.contato_alteracao !== "excluido"
    )
    .map((c) => ({ ...c, contato_alteracao: "adicionado" }));

  const editados = contatosNovos.filter(
    (c) =>
      idsOriginais.has(c.contato_id) && c.contato_alteracao === "modificado"
  );

  const removidos = contatosNovos.filter(
    (c) => idsOriginais.has(c.contato_id) && c.contato_alteracao === "excluido"
  );

  return { adicionados, removidos, editados };
}

export async function buscaContatos(id) {
  try {
    const response = await api.get(`/contato/${id}`);

    return response.data;
  } catch (err) {
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      try {
        await refresh();
        const response = await api.get(`/contato/${id}`);

        return response.data;
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
    }
    if (
      err.response &&
      err.response.status === 404 &&
      (
        err.response.data?.error === "Contatos não encontrados." ||
        err.response.data?.error === "Contatos não encontrados"
      )
    ) {
      return [];
    }
    console.error("Erro ao buscar contatos:", err);
    throw err;
  }
}



async function postContatos(adicionados, associacao_id) {
  const contatos = manterArray(adicionados);
  const resultados = [];
  console.log("post: ", contatos);
  for (const contato of contatos) {
    try {
      const response = await api.post(`/contato`, {
          contato_associacao_id: associacao_id,
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
      });

      resultados.push({
        erro: false,
        mensagem: response.data?.message || "Contato adicionado com sucesso!",
      });
    } catch (err) {
      try {
        await refresh();
        const response = await api.post(`/contato`, {
          contato_associacao_id: associacao_id,
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
        });

        resultados.push({
          erro: false,
          mensagem: response.data?.message || "Contato adicionado com sucesso!",
        });
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
      console.log("Erro ao adicionar contato: ", err);
      resultados.push({
        erro: true,
        mensagem: "Erro de conexão ao adicionar contato",
      });
    }
  }    
  return resultados;
}

async function putContatos(editados) {
  const contatos = manterArray(editados);
  console.log("put: ", contatos);
  const resultados = [];
  for (const contato of contatos) {
    try {
      const response = await api.put(`/contato/${contato.contato_id}`, {
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
      });

      resultados.push({
        erro: false,
        mensagem: response.data?.message || "Contato editado com sucesso!",
      });
    } catch (err) {
      try {
        await refresh();
        const response = await api.put(`/contato/${contato.contato_id}`, {
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
        });

        resultados.push({
          erro: false,
          mensagem: response.data?.message || "Contato editado com sucesso!",
        });
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
      console.log("Erro ao editar contato: ", err);
      resultados.push({
        erro: true,
        mensagem: "Erro de conexão ao editar contato",
      });
    }
  }
  return resultados;
}

async function deleteContatos(deletados) {
  const contatos = manterArray(deletados);
  console.log("delete: ", contatos);
  const resultados = [];
  for (const contato of contatos) {
    try {
      const response = await api.delete(`/contato/${contato.contato_id}`);

      resultados.push({
        erro: false,
        mensagem: response.data?.message || "Contato deletado com sucesso!",
      });
    } catch (err) {
      try {
        await refresh();
        const response = await api.delete(`/contato/${contato.contato_id}`);

        resultados.push({
          erro: false,
          mensagem: response.data?.message || "Contato deletado com sucesso!",
        });
      } catch (refreshErr) {
        console.error("Erro ao buscar token:", refreshErr);
        return { erro: true, mensagem: "Sessão inválida!" };
      }
      console.log("Erro ao deletar contato: ", err);
      resultados.push({
        erro: true,
        mensagem: "Erro de conexão ao deletar contato",
      });
    }
  }
  return resultados;
}

export async function salvaContatos(
  contatosAntigos = [],
  contatosNovos = [],
  associacao_id
) {
  if (contatosAntigos == [] && contatosNovos == []) {
    return [];
  }
  const { adicionados, removidos, editados } = separaContatos(
    contatosAntigos,
    contatosNovos
  );
  let erros = [];
  if (adicionados && adicionados.length > 0) {
    const resp = await postContatos(adicionados, associacao_id);
    erros = erros.concat(resp.filter((r) => r.erro));
  }
  if (editados && editados.length > 0) {
    const resp = await putContatos(editados);
    erros = erros.concat(resp.filter((r) => r.erro));
  }
  if (removidos && removidos.length > 0) {
    const resp = await deleteContatos(removidos);
    erros = erros.concat(resp.filter((r) => r.erro));
  }
  return erros;
}
