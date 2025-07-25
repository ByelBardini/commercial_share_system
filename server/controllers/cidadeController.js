import { Cidade } from "../models/index.js"

export async function getCidades(req, res){
  try{

    const cidades = await Cidade.findAll({
      order: [
        ["cidade_favorito", "DESC"],
        ["cidade_nome", "ASC"]
      ]
    });

    res.status(200).json(cidades);

  }catch(err){
    console.error("Erro ao buscar cidades:", err);
    res.status(500).json({ error: "Erro ao buscar cidades, fale com um administrador" });
  }
}

export async function postCidade(req, res){
  const { cidade_nome, cidade_uf } = req.body;

  if (!cidade_nome || !cidade_uf) {
    res
      .status(400)
      .json({ error: "Nome e UF da cidade são obrigatórios." });
  }

  try{

    await Cidade.create({
      cidade_nome:cidade_nome,
      cidade_uf:cidade_uf,
    })

    res.status(201).json({ message: "Cidade cadastrada com sucesso!" });

  }catch(err){
    console.error("Erro ao cadastrar cidade:", err);
    res.status(500).json({ error: "Erro ao cadastrar cidade" });
  }
}

export async function putCidade(req, res) {
  const { id } = req.params;
  const { cidade_nome, cidade_uf } = req.body;

  if (!id) {
    res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  if (!cidade_nome || !cidade_uf) {
    res
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
    
    res.status(201).json({ message: "Cidade atualizada com sucesso!" });

  }catch(err){
    console.error("Erro ao atualizar cidade:", err);
    res.status(500).json({ error: "Erro ao atualizar cidade" });
  }
}

export async function favoritaCidade(req, res) {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  try{

    const cidade = await Cidade.findByPk(id);
    if (!cidade) {
      res.status(404).json({ error: "Cidade não encontrada, fale com um administrador do sistema" });
    }
    cidade.cidade_favorito = (!cidade.cidade_favorito || cidade.cidade_favorito === 0) ? 1 : 0;
    await cidade.save();

    res.status(200).json({
      message: associacao.cidade_favorito
        ? "Cidade marcada como favorita."
        : "Cidade removida dos favoritos."
    });

  }catch(err){
    console.error("Erro ao favoritar/desfavoritar cidade:", err);
      res
        .status(500)
        .json({ error: "Erro ao favoritar/desfavoritar cidade" });
  }
}

export const deleteCidade = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  try{

    const [execucoes] = Cidade.destroy({
      where:{
        cidade_id:id,
      }
    });

    if (execucoes === 0) {
      res.status(404).json({ error: "Cidade não encontrada para editar, fale com um administrador do sistema" });
    }
    
    res
      .status(202)
      .json({ message: "Cidade deletada com sucesso!" });

  }catch(err){
    console.error("Erro ao deletar cidade:", err);
    res
      .status(500)
      .json({ error: "Erro ao deletar cidade" });
  }
}
