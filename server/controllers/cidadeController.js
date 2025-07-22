import db from "../config/db.js";

export const getCidades = (req, res) => {
    const sql = "SELECT * FROM cidades";
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar cidades:", err);
            return res.status(500).json({ error: "Erro ao buscar cidades" });
        }
        res.json(results);
    });
}

export const postCidade = (req, res) => {
    const { cidade_nome, cidade_uf } = req.body;

    if (!cidade_nome || !cidade_uf) {
        return res.status(400).json({ error: "Nome e UF da cidade são obrigatórios." });
    }

    const sql = `INSERT INTO cidades (cidade_nome, cidade_uf) VALUES (?, ?)`;
    db.query(sql, [cidade_nome, cidade_uf], (err, results) => {
        if (err) {
            console.error("Erro ao cadastrar cidade:", err);
            return res.status(500).json({ error: "Erro ao cadastrar cidade" });
        }
        res.status(201).json({ message: "Cidade cadastrada com sucesso!" });
    });
}