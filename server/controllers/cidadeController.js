import { Cidade } from "../models/index.js"

export async function getCidades(req, res){
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }
  try{

    const cidades = await Cidade.findAll({
      order: [
        ["cidade_favorito", "DESC"],
        ["cidade_nome", "ASC"]
      ]
    });

    return res.status(200).json(cidades);

  }catch(err){
    console.error("Erro ao buscar cidades:", err);
    return res.status(500).json({ error: "Erro ao buscar cidades, fale com um administrador" });
  }
}

export async function postCidade(req, res){
  const { cidade_nome, cidade_uf } = req.body;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!cidade_nome || !cidade_uf) {
    return res
      .status(400)
      .json({ error: "Nome e UF da cidade são obrigatórios." });
  }

  try{

    await Cidade.create({
      cidade_nome:cidade_nome,
      cidade_uf:cidade_uf,
    })

    return res.status(201).json({ message: "Cidade cadastrada com sucesso!" });

  }catch(err){
    console.error("Erro ao cadastrar cidade:", err);
    return res.status(500).json({ error: "Erro ao cadastrar cidade" });
  }
}

export async function putCidade(req, res) {
  const { id } = req.params;
  const { cidade_nome, cidade_uf } = req.body;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  if (!cidade_nome || !cidade_uf) {
    return res
      .status(400)
      .json({ error: "Nome e UF da cidade são obrigatórios." });
  }

  try{

    const [execucoes] = await Cidade.update({
      cidade_nome:cidade_nome,
      cidade_uf:cidade_uf,
    },
    {
      where:{
        cidade_id:id,
      }
    });
    
    return res.status(201).json({ message: "Cidade atualizada com sucesso!" });

  }catch(err){
    console.error("Erro ao atualizar cidade:", err);
    return res.status(500).json({ error: "Erro ao atualizar cidade" });
  }
}

export async function favoritaCidade(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  try{

    const cidade = await Cidade.findByPk(id);
    if (!cidade) {
      return res.status(404).json({ error: "Cidade não encontrada, fale com um administrador do sistema" });
    }
    cidade.cidade_favorito = (!cidade.cidade_favorito || cidade.cidade_favorito === 0) ? 1 : 0;
    await cidade.save();

    return res.status(200).json({
      message: associacao.cidade_favorito
        ? "Cidade marcada como favorita."
        : "Cidade removida dos favoritos."
    });

  }catch(err){
    console.error("Erro ao favoritar/desfavoritar cidade:", err);
      return res
        .status(500)
        .json({ error: "Erro ao favoritar/desfavoritar cidade" });
  }
}

export const deleteCidade = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  try{

    const [execucoes] = Cidade.destroy({
      where:{
        cidade_id:id,
      }
    });

    if (execucoes === 0) {
      return res.status(404).json({ error: "Cidade não encontrada para editar, fale com um administrador do sistema" });
    }
    
    return res
      .status(202)
      .json({ message: "Cidade deletada com sucesso!" });

  }catch(err){
    console.error("Erro ao deletar cidade:", err);
    return res
      .status(500)
      .json({ error: "Erro ao deletar cidade" });
  }
}
