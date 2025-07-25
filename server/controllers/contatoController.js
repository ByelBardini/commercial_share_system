import { Contato } from "../models/index.js"

export async function getContatos(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "ID inválido" });
  }

  try{

    const contatos = await Contato.findAll({
      where:{
        contato_associacao_id:id,
      },
    });

    res
      .status(200)
      .json(contatos || []);

  }catch(err){
    console.error("Erro ao buscar contatos:", err);
      res
        .status(500)
        .json({
          error: "Erro interno do servidor, tente novamente mais tarde",
        });
  }
};

export async function postContatos (req, res) {
  const { contato_associacao_id, contato_tipo, contato_nome, contato } =
    req.body;

  if (!contato_associacao_id || !contato_tipo || !contato_nome || !contato) {
    res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  if (
    typeof contato_nome !== "string" ||
    contato_nome.trim().length < 2 ||
    contato_nome.length > 100
  ) {
    res.status(400).json({ error: "Nome do contato inválido." });
  }

  try{

    await Contato.create({
      contato_associacao_id:contato_associacao_id,
      contato_tipo:contato_tipo,
      contato_nome:contato_nome,
      contato:contato,
    });

      res.status(201).json({ message: "Contato cadastrado com sucesso!" });

  }catch(err){
    console.error("Erro ao cadastrar contato:", err);
    res.
      status(500)
      .json({
        error: "Erro interno do servidor, tente novamente mais tarde.",
      });
  }
};

export async function putContato(req, res) {
  const { contato_tipo, contato_nome, contato } = req.body;
  const { id } = req.params;

  if (!id || !contato_tipo || !contato_nome || !contato) {
    res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  if (
    typeof contato_nome !== "string" ||
    contato_nome.trim().length < 2 ||
    contato_nome.length > 100
  ) {
    res.status(400).json({ error: "Nome do contato inválido." });
  }

  try{

    const [execucoes] = await Contato.update({
      contato_tipo:contato_tipo,
      contato_nome:contato_nome,
      contato:contato,
    },
    {
      where:{
        contato_id:id,
      },
    });
    
    res.status(201).json({ message: "Contato modificado com sucesso!" });
  }catch(err){
    console.error("Erro ao modificar contato:", err);
    res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
}

export async function deleteContato (req, res) {
  const { id } = req.params;

  if (!id || id == "") {
    res.status(400).json({ error: "Id é obrigatório" });
  }

  try{

    const execucoes = await Contato.destroy({
      where:{
        contato_id:id,
      }
    });

    if (execucoes.length === 0){
      res.status(404).json({ error: "Contato não encontrado." });
    }
    
    res.status(201).json({ message: "Contato deletado com sucesso!" });
  }catch(err){
    console.error("Erro ao deletar contato:", err);
    res.status(500).json({
      error: "Erro interno do servidor, tente novamente mais tarde.",
    });
  }
};
