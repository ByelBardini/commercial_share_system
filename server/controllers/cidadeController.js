import db from "../config/db.js";

export const getCidades = (req, res) => {
  const sql = "SELECT * FROM cidades ORDER BY cidade_favorito = 0, cidade_nome";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Erro ao buscar cidades:", err);
      return res.status(500).json({ error: "Erro ao buscar cidades" });
    }
    res.json(results);
  });
};

export const postCidade = (req, res) => {
  const { cidade_nome, cidade_uf } = req.body;

  if (!cidade_nome || !cidade_uf) {
    return res
      .status(400)
      .json({ error: "Nome e UF da cidade são obrigatórios." });
  }

  const sql = `INSERT INTO cidades (cidade_nome, cidade_uf) VALUES (?, ?)`;
  db.query(sql, [cidade_nome, cidade_uf], (err, results) => {
    if (err) {
      console.error("Erro ao cadastrar cidade:", err);
      return res.status(500).json({ error: "Erro ao cadastrar cidade" });
    }
    res.status(201).json({ message: "Cidade cadastrada com sucesso!" });
  });
};

export const putCidade = (req, res) => {
  const { id } = req.params;
  const { cidade_nome, cidade_uf } = req.body;

  if (!cidade_nome || !cidade_uf) {
    return res
      .status(400)
      .json({ error: "Nome e UF da cidade são obrigatórios." });
  }

  const sql = `UPDATE cidades SET cidade_nome = ?, cidade_uf = ? WHERE cidade_id = ?`;
  db.query(sql, [cidade_nome, cidade_uf, id], (err, results) => {
    if (err) {
      console.error("Erro ao atualizar cidade:", err);
      return res.status(500).json({ error: "Erro ao atualizar cidade" });
    }
    res.json({ message: "Cidade atualizada com sucesso!" });
  });
};

export const favoritaCidade = (req, res) => {
  const { id } = req.params;

  const sql = `UPDATE cidades 
                    SET cidade_favorito = 
                        CASE
                            WHEN cidade_favorito IS NULL OR cidade_favorito = 0 THEN 1
                            WHEN cidade_favorito = 1 THEN 0
                            ELSE cidade_favorito
                        END
                  WHERE cidade_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao favoritar/desfavoritar cidade:", err);
      return res
        .status(500)
        .json({ error: "Erro ao favoritar/desfavoritar cidade" });
    }
    res.json({ message: "Cidade favoritada/desfavoritada com sucesso!" });
  });
};

export const deleteCidade = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM cidades WHERE cidade_id = ?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Erro ao deletar cidade:", err);
      return res.status(500).json({ error: "Erro ao deletar cidade" });
    }
    res.json({ message: "Cidade deletada com sucesso!" });
  });
};
