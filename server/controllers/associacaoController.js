import db from "../config/db.js";

export const getAssociacoesPorCidade = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da cidade é obrigatório." });
  }

  const sql = `SELECT associacao_id, associacao_nome_fantasia, associacao_cliente FROM associacoes WHERE associacao_cidade_id = ? ORDER BY associacao_nome_fantasia`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar associações por cidade:", err);
      return res
        .status(500)
        .json({
          error: "Erro interno ao buscar empresas, tente novamente mais tarde.",
        });
    }
    res.json(results);
  });
};

export const getAssociacaoFull = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  const sql = `SELECT * FROM associacoes WHERE associacao_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar associação:", err);
      return res
        .status(500)
        .json({
          error:
            "Erro interno ao buscar dados da empresa, tente novamente mais tadde.",
        });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({
          error:
            "Empresa não encontrada, verifique com um administrador do sistema.",
        });
    }
    res.json(results[0]);
  });
};

export const postAssociacao = (req, res) => {
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
    return res.status(400).json({ error: "Nome da empresa inválido." });
  }
  if (associacao_cnpj && associacao_cnpj.length > 30) {
    return res.status(400).json({ error: "CNPJ muito longo." });
  }
  if (associacao_observacao && associacao_observacao.length > 200) {
    return res.status(400).json({ error: "Observação muito longa." });
  }

  const sql = `INSERT INTO associacoes (associacao_cidade_id, associacao_nome, associacao_nome_fantasia, associacao_cnpj, associacao_data_contato, associacao_data_fechamento, associacao_observacao,associacao_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      associacao_cidade_id,
      associacao_nome,
      associacao_nome_fantasia,
      associacao_cnpj,
      associacao_data_contato,
      associacao_data_fechamento,
      associacao_observacao,
      associacao_cliente,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar empresa:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "Empresa já cadastrada (CNPJ ou nome duplicado)." });
        }
        return res
          .status(500)
          .json({
            error: "Erro do servidor ao cadastrar empresa, tente mais tarde.",
          });
      }
      res.status(201).json({ message: "Empresa cadastrada com sucesso!" });
    }
  );
};

export const putAssociacao = (req, res) => {
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
  console.log(req.body);

  if (
    !associacao_nome ||
    !associacao_nome_fantasia ||
    (associacao_cliente !== 0 && associacao_cliente !== 1)
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
  if (associacao_cnpj && associacao_cnpj.length > 30) {
    return res.status(400).json({ error: "CNPJ muito longo." });
  }
  if (associacao_observacao && associacao_observacao.length > 100) {
    return res.status(400).json({ error: "Observação muito longa." });
  }

  const sql = `UPDATE associacoes SET associacao_nome = ?,
    associacao_nome_fantasia = ?,
    associacao_cnpj = ?,
    associacao_data_contato = ?,
    associacao_data_fechamento = ?,
    associacao_observacao = ?,
    associacao_preco_placa = ?,
    associacao_preco_instalacao = ?,
    associacao_cliente = ?
    WHERE associacao_id = ?`;
  db.query(
    sql,
    [
      associacao_nome,
      associacao_nome_fantasia,
      associacao_cnpj,
      associacao_data_contato,
      associacao_data_fechamento,
      associacao_observacao,
      associacao_preco_placa,
      associacao_preco_instalacao,
      associacao_cliente,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao editar empresa:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res
            .status(409)
            .json({ error: "Já existe uma empresa com esse nome ou CNPJ" });
        }
        return res
          .status(500)
          .json({
            error: "Erro do servidor ao editar empresa, tente mais tarde.",
          });
      }
      res.status(201).json({ message: "Empresa editada com sucesso!" });
    }
  );
};

export const deleteAssociacao = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da empresa é obrigatório." });
  }

  const sql = `DELETE FROM associacoes WHERE associacao_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar associação:", err);
      return res
        .status(500)
        .json({
          error: "Erro interno ao ao deletar empresa, tente mais tarde",
        });
    }
    res.status(200).json({ message: "Empresa deletada com sucesso!" });
  });
};
