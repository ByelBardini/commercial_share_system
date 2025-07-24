import db from "../config/db.js";

export const getContatos = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM contatos WHERE contato_associacao_id = ?`;

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao buscar contatos:", err);
      return res.status(500).json({ error: "Erro ao buscar contatos" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "Contatos não encontrados." });
    }
    res.json(results);
  });
};

export const postContatos = (req, res) => {
  const { contato_associacao_id, contato_tipo, contato_nome, contato } =
    req.body;

  if (!contato_associacao_id || !contato_tipo || !contato_nome || !contato) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  const sql = `INSERT INTO contatos (contato_associacao_id, contato_tipo, contato_nome, contato) VALUES (?, ?, ?, ?)`;
  db.query(
    sql,
    [contato_associacao_id, contato_tipo, contato_nome, contato],
    (err, results) => {
      if (err) {
        console.error("Erro ao cadastrar contato:", err);
        return res.status(500).json({ error: "Erro ao cadastrar contato" });
      }
      res.status(201).json({ message: "Contato cadastrado com sucesso!" });
    }
  );
};

export const putContato = (req, res) => {
  const { contato_tipo, contato_nome, contato } = req.body;
  const { id } = req.params;

  if (!id || !contato_tipo || !contato_nome || !contato) {
    return res.status(400).json({ error: "Todos os dados são obrigatórios" });
  }

  const sql = `UPDATE contatos set contato_tipo = ?, contato_nome = ?, contato = ? WHERE contato_id = ?`;

  db.query(sql, [contato_tipo, contato_nome, contato, id], (err, results) => {
    if (err) {
      console.error("Erro ao modificar contato:", err);
      return res.status(500).json({ error: "Erro ao modificar contato" });
    }
    res.status(201).json({ message: "Contato modificado com sucesso!" });
  });
};

export const deleteContato = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Id é obrigatório" });
  }

  const sql = `DELETE FROM contatos WHERE contato_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar contato:", err);
      return res.status(500).json({ error: "Erro ao deletar contato" });
    }
    res.status(201).json({ message: "Contato deletado com sucesso!" });
  });
};
