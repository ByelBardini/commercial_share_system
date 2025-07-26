import { Associacao } from "../models/index.js";

export async function getAssociacoesPorCidade(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  try {
    const associacoes = await Associacao.findAll({
      where: { associacao_cidade_id: id },
      attributes: [
        "associacao_id",
        "associacao_nome_fantasia",
        "associacao_cliente",
        "associacao_favorito",
      ],
      order: [
        ["associacao_favorito", "DESC"],
        ["associacao_nome_fantasia", "ASC"],
      ],
    });
    return res.json(associacoes);
  } catch (err) {
    console.error("Erro ao buscar associações por cidade:", err);
    return res.status(500).json({
      error: "Erro interno ao buscar empresas, tente novamente mais tarde.",
    });
  }
}

export async function getAssociacaoFull(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  try {
    const associacao = await Associacao.findByPk(id);
    if (associacao.length === null) {
      return res.status(404).json({
        error:
          "Empresa não encontrada, verifique com um administrador do sistema.",
      });
    } else {
      return res.status(200).json(associacao);
    }
  } catch (err) {
    console.error("Erro ao buscar associação:", err);
    return res.status(500).json({
      error: "Erro interno ao buscar empresas, tente novamente mais tarde.",
    });
  }
}

export async function postAssociacao(req, res) {
  const {
    associacao_cidade_id,
    associacao_nome,
    associacao_nome_fantasia,
    associacao_cnpj,
    associacao_data_contato,
    associacao_data_fechamento,
    associacao_observacao,
    associacao_cliente,
  } = req.body;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (
    !associacao_nome ||
    !associacao_nome_fantasia ||
    !associacao_cidade_id ||
    !associacao_cliente
  ) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }
  if (
    typeof associacao_nome !== "string" ||
    associacao_nome.trim().length < 2 ||
    associacao_nome.trim().length > 100
  ) {
    return res.status(400).json({ error: "Nome da empresa inválido." });
  }
  if (
    typeof associacao_nome_fantasia !== "string" ||
    associacao_nome_fantasia.trim().length < 2 ||
    associacao_nome_fantasia.trim().length > 100
  ) {
    return res
      .status(400)
      .json({ error: "Nome fantasia da empresa inválido." });
  }
  if (associacao_cnpj && associacao_cnpj.length > 30) {
    return res.status(400).json({ error: "CNPJ muito longo." });
  }
  if (associacao_observacao && associacao_observacao.length > 200) {
    return res.status(400).json({ error: "Observação muito longa." });
  }

  try {
    await Associacao.create(
      {
        associacao_cidade_id: associacao_cidade_id,
        associacao_nome: associacao_nome,
        associacao_nome_fantasia: associacao_nome_fantasia,
        associacao_cnpj: associacao_cnpj,
        associacao_data_contato: associacao_data_contato,
        associacao_data_fechamento: associacao_data_fechamento,
        associacao_observacao: associacao_observacao,
        associacao_cliente: associacao_cliente,
      },
      {
        usuario_id,
      }
    );

    return res.status(201).json({ message: "Empresa cadastrada com sucesso!" });
  } catch (err) {
    console.error("Erro ao cadastrar empresa:", err);
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(409)
        .json({ error: "Empresa já cadastrada (CNPJ ou nome duplicado)." });
    }
    return res.status(500).json({
      error: "Erro do servidor ao cadastrar empresa, tente mais tarde.",
    });
  }
}

export async function putAssociacao(req, res) {
  const { id } = req.params;
  const {
    associacao_nome,
    associacao_nome_fantasia,
    associacao_cnpj = null,
    associacao_data_contato = null,
    associacao_data_fechamento = null,
    associacao_observacao = null,
    associacao_preco_placa = null,
    associacao_preco_instalacao = null,
    associacao_cliente,
  } = req.body;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  if (
    !associacao_nome ||
    !associacao_nome_fantasia ||
    (associacao_cliente != 0 && associacao_cliente != 1)
  ) {
    return res
      .status(400)
      .json({ error: "Todos os campos obrigatórios devem ser preenchidos." });
  }
  if (
    typeof associacao_nome !== "string" ||
    associacao_nome.trim().length < 2 ||
    associacao_nome.trim().length > 100
  ) {
    return res.status(400).json({ error: "Nome da empresa inválido." });
  }
  if (
    typeof associacao_nome_fantasia !== "string" ||
    associacao_nome_fantasia.trim().length < 2 ||
    associacao_nome_fantasia.trim().length > 100
  ) {
    return res
      .status(400)
      .json({ error: "Nome fantasia da empresa inválido." });
  }
  if (associacao_cnpj && associacao_cnpj.length > 30) {
    return res.status(400).json({ error: "CNPJ muito longo." });
  }
  if (associacao_observacao && associacao_observacao.length > 100) {
    return res.status(400).json({ error: "Observação muito longa." });
  }

  try {
    const empresa = await Associacao.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ error: "Empresa não encontrada, fale com um administrador do sistema" });
    }

    await empresa.update(
      {
        associacao_nome: associacao_nome,
        associacao_nome_fantasia: associacao_nome_fantasia,
        associacao_cnpj: associacao_cnpj,
        associacao_data_contato: associacao_data_contato,
        associacao_data_fechamento: associacao_data_fechamento,
        associacao_observacao: associacao_observacao,
        associacao_preco_placa: associacao_preco_placa,
        associacao_preco_instalacao: associacao_preco_instalacao,
        associacao_cliente: associacao_cliente,
      },
      {
        usuario_id,
      }
    );

    return res.status(201).json({ message: "Empresa editada com sucesso!" });
  } catch (err) {
    if (err) {
      console.error("Erro ao editar empresa:", err);
      if (err.name === "SequelizeUniqueConstraintError") {
        return res
          .status(409)
          .json({ error: "Já existe uma empresa com esse nome ou CNPJ" });
      }
      return res.status(500).json({
        error: "Erro do servidor ao editar empresa, tente mais tarde.",
      });
    }
  }
}

export async function favoritarAssociacao(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  try {
    const associacao = await Associacao.findByPk(id);
    if (!associacao) {
      res.status(404).json({
        error: "Empresa não encontrada, fale com um administrador do sistema",
      });
    }
    associacao.associacao_favorito =
      !associacao.associacao_favorito || associacao.associacao_favorito === 0
        ? 1
        : 0;
    await associacao.save({ skipLog: true });

    res.status(200).json({
      message: associacao.associacao_favorito
        ? "Empresa marcada como favorita."
        : "Empresa removida dos favoritos.",
    });
  } catch (err) {
    console.error("Erro ao favoritar/desfavoritar empresa:", err);
    res.status(500).json({
      error:
        "Erro interno ao ao favoritar/desfavoritar empresa, tente mais tarde",
    });
  }
}

export async function deleteAssociacao(req, res) {
  const { id } = req.params;
  const { usuario_id } = req.session.user;

  if (!usuario_id){
    return res.status(401).json({error: "Necessário estar logado para realizar operações."})
  }

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  try {
    const empresa = await Associacao.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ error: "Empresa não encontrada." });
    }
    await empresa.destroy({ usuario_id });

    return res.status(200).json({ message: "Empresa deletada com sucesso!" });
  } catch (err) {
    console.error("Erro ao deletar empresa:", err);
    return res.status(500).json({
      error: "Erro interno ao ao deletar empresa, tente mais tarde",
    });
  }
}
