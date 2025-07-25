const URL = "http://localhost:3000/contato";

function manterArray(valor) {
  if (Array.isArray(valor)) return valor;
  if (valor == null) return [];
  return [valor];
}

export async function buscaContatos(id) {
  try {
    const response = await fetch(`${URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Falha ao buscar contatos");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
  }
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

async function postContatos(adicionados, associacao_id) {
  const contatos = manterArray(adicionados);
  const resultados = [];
  console.log("post: ", contatos);
  for (const contato of contatos) {
    try {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          contato_associacao_id: associacao_id,
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
        }),
      });
      let data = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn("Erro ao converter resposta em JSON:", jsonErr);
        data = {};
      }
      if (!response.ok) {
        resultados.push({
          erro: true,
          mensagem: data?.error || "Erro ao adicionar contato",
        });
      } else {
        resultados.push({
          erro: false,
          mensagem: data?.message || "Contato adicionado com sucesso!",
        });
      }
    } catch (err) {
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
      const response = await fetch(`${URL}/${contato.contato_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          contato_tipo: contato.contato_tipo,
          contato_nome: contato.contato_nome,
          contato: contato.contato,
        }),
      });
      let data = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn("Erro ao converter resposta em JSON:", jsonErr);
        data = {};
      }
      if (!response.ok) {
        resultados.push({
          erro: true,
          mensagem: data?.error || "Erro ao editar contato",
        });
      } else {
        resultados.push({
          erro: false,
          mensagem: data?.message || "Contato editado com sucesso!",
        });
      }
    } catch (err) {
      console.log("Erro ao adicionar contato: ", err);
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
      const response = await fetch(`${URL}/${contato.contato_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      let data = {};
      try {
        data = await response.json();
      } catch (jsonErr) {
        console.warn("Erro ao converter resposta em JSON:", jsonErr);
        data = {};
      }
      if (!response.ok) {
        resultados.push({
          erro: true,
          mensagem: data?.error || "Erro ao deletar contato",
        });
      } else {
        resultados.push({
          erro: false,
          mensagem: data?.message || "Contato deletado com sucesso!",
        });
      }
    } catch (err) {
      console.log("Erro ao adicionar contato: ", err);
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
