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
  console.log("post: ", contatos);
  for (const contato of contatos) {
    await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contato_associacao_id: associacao_id,
        contato_tipo: contato.contato_tipo,
        contato_nome: contato.contato_nome,
        contato: contato.contato,
      }),
      credentials: "include",
    });
  }
}

async function putContatos(editados) {
  const contatos = manterArray(editados);
  console.log("put: ", contatos);

  for (const contato of contatos) {
    await fetch(`${URL}/${contato.contato_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contato_tipo: contato.contato_tipo,
        contato_nome: contato.contato_nome,
        contato: contato.contato,
      }),
      credentials: "include",
    });
  }
}

async function deleteContatos(deletados) {
  const contatos = manterArray(deletados);
  console.log("delete: ", contatos);

  for (const contato of contatos) {
    await fetch(`${URL}/${contato.contato_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }
}

export async function salvaContatos(
  contatosAntigos = [],
  contatosNovos = [],
  associacao_id
) {
  if (contatosAntigos == [] && contatosNovos == []) {
    return;
  }
  const { adicionados, removidos, editados } = separaContatos(
    contatosAntigos,
    contatosNovos
  );

  if (adicionados) {
    await postContatos(adicionados, associacao_id);
  }
  if (editados) {
    await putContatos(editados);
  }
  if (removidos) {
    await deleteContatos(removidos);
  }
}
