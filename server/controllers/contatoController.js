import { Contato } from "../models/index.js";

export async function getContatos(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const contatos = await Contato.findAll({
      where: {
        contato_associacao_id: id,
      },
    });

    return res.status(200).json(contatos || []);
  } catch (err) {
    console.error("Erro ao buscar contatos:", err);
    return res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde",
    });
  }
}

export async function postContatos(req, res) {
  const { contato_associacao_id, contato_tipo, contato_nome, contato } =
    req.body;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!contato_associacao_id || !contato_tipo || !contato_nome || !contato) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  if (
    typeof contato_nome !== "string" ||
    contato_nome.trim().length < 2 ||
    contato_nome.length > 100
  ) {
    return res.status(400).json({ error: "Nome do contato inválido." });
  }

  try {
    await Contato.create({
      contato_associacao_id: contato_associacao_id,
      contato_tipo: contato_tipo,
      contato_nome: contato_nome,
      contato: contato,
    });

    return res.status(201).json({ message: "Contato cadastrado com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar contato:", err);
    return res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
}

export async function putContato(req, res) {
  const { contato_tipo, contato_nome, contato } = req.body;
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id || !contato_tipo || !contato_nome || !contato) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  if (
    typeof contato_nome !== "string" ||
    contato_nome.trim().length < 2 ||
    contato_nome.length > 100
  ) {
    return res.status(400).json({ error: "Nome do contato inválido." });
  }

  try {
    const contatoModificar = await Contato.findByPk(id);

    if (!contatoModificar) {
      return res.status(404).json({
        error: "Contato não encontrado, fale com um aministraor do sistema.",
      });
    }

    await contatoModificar.update(
      {
        contato_tipo: contato_tipo,
        contato_nome: contato_nome,
        contato: contato,
      },
      {
        usuario_id,
      }
    );

    return res.status(201).json({ message: "Contato modificado com sucesso!" });
  } catch (err) {
    console.error("Erro ao modificar contato:", err);
    return res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
}

export async function deleteContato(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id || id == "") {
    return res.status(400).json({ error: "Id é obrigatório" });
  }

  try {
    const contato = await Contato.findByPk(id);

    if (!contato) {
      return res
        .status(404)
        .json({
          error:
            "Contato não encontrado, fale com um administrador do sistema.",
        });
    }

    await contato.destroy({ usuario_id });

    return res.status(201).json({ message: "Contato deletado com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar contato:", err);
    return res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
}
