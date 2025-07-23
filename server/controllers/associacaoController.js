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
        .json({ error: "Erro ao buscar associações por cidade" });
    }
    res.json(results);
  });
};

export const getAssociacaoFull = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da associação é obrigatório." });
  }

  const sql = `SELECT * FROM associacoes WHERE associacao_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar associação:", err);
      return res.status(500).json({ error: "Erro ao buscar associação" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Associação não encontrada." });
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
    return res.status(400).json({ error: "Os campos são obrigatórios." });
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
        console.error("Erro ao cadastrar associação:", err);
        return res.status(500).json({ error: "Erro ao cadastrar associação" });
      }
      res.status(201).json({ message: "Associação cadastrada com sucesso!" });
    }
  );
};

export const putAssociacao = (req, res) => {
  const { id } = req.params;
  const {
    associacao_nome,
    associacao_nome_fantasia,
    associacao_cnpj,
    associacao_cidade_id,
  } = req.body;

  if (
    !associacao_nome ||
    !associacao_nome_fantasia ||
    !associacao_cnpj ||
    !associacao_cidade_id
  ) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios." });
  }

  const sql = `UPDATE associacoes SET associacao_nome = ?, associacao_nome_fantasia = ?, associacao_cnpj = ?, associacao_cidade_id = ? WHERE associacao_id = ?`;
  db.query(
    sql,
    [
      associacao_nome,
      associacao_nome_fantasia,
      associacao_cnpj,
      associacao_cidade_id,
      id,
    ],
    (err, results) => {
      if (err) {
        console.error("Erro ao atualizar associação:", err);
        return res.status(500).json({ error: "Erro ao atualizar associação" });
      }
      res.json({ message: "Associação atualizada com sucesso!" });
    }
  );
};

export const deleteAssociacao = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID da associação é obrigatório." });
  }

  const sql = `DELETE FROM associacoes WHERE associacao_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar associação:", err);
      return res.status(500).json({ error: "Erro ao deletar associação" });
    }
    res.json({ message: "Associação deletada com sucesso!" });
  });
};
