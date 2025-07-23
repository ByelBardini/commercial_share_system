import db from "../config/db.js";
import bcrypt from "bcrypt";

export const registrarUsuario = (req, res) => {
    const { usuario_nome, usuario_login, usuario_senha, usuario_role } = req.body;

    if(!usuario_nome || !usuario_login || !usuario_senha || !usuario_role) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    const senhaHash = bcrypt.hashSync(usuario_senha, 10);
    const sql = `INSERT INTO usuarios (usuario_nome, usuario_login, usuario_senha, usuario_role) VALUES (?, ?, ?, ?)`

    db.query(sql, [usuario_nome, usuario_login, senhaHash, usuario_role], (err, results) =>{
        if(err) {
            console.error("Erro ao registrar usuário:", err);
            return res.status(500).json({ error: "Erro ao registrar usuário" });
        }
        res.status(201).json({ message: "Usuário registrado com sucesso!" });
    })
}

export const resetaSenhaUsuario = (req, res) =>{
    const { id } = req.params;
    const nova_senha = bcrypt.hashSync("12345", 10);
    
    const sql = `UPDATE usuarios SET usuario_senha = ?, usuario_troca_senha = 1 WHERE usuario_id = ?`;
    db.query(sql, [nova_senha, id], (err, results) => {
        if (err) {
            console.error("Erro ao resetar senha:", err);
            return res.status(500).json({ error: "Erro ao resetar senha" });
        }
        res.status(200).json({ message: "Senha resetada com sucesso!" });
    });
}

export const trocaSenhaUsuario = (req, res) => {
    const { usuario_id } = req.session.user;
    const { nova_senha } = req.body;

    console.log(usuario_id, nova_senha);

    if (!nova_senha || !usuario_id) {
        return res.status(400).json({ error: "Nova senha é obrigatória." });
    }

    const senhaHash = bcrypt.hashSync(nova_senha, 10);
    const sql = `UPDATE usuarios SET usuario_senha = ?, usuario_troca_senha = 0 WHERE usuario_id = ?`;
    
    db.query(sql, [senhaHash, usuario_id], (err, results) => {
        if (err) {
            console.error("Erro ao trocar senha:", err);
            return res.status(500).json({ error: "Erro ao trocar senha" });
        }
        res.status(200).json({ message: "Senha trocada com sucesso!" });
    });
}

export const getUsuarios = (req, res) => {
    const sql = `SELECT usuario_id, usuario_nome, usuario_login, usuario_role FROM usuarios`;
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Erro ao buscar usuários:", err);
            return res.status(500).json({ error: "Erro ao buscar usuários" });
        }
        res.status(200).json(results);
    });
}

export const inativaUsuario = (req, res) => {
    const { id } = req.params;
    const sql = `UPDATE usuarios SET usuario_ativo = 0 WHERE usuario_id = ?`;
    
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Erro ao inativar usuário:", err);
            return res.status(500).json({ error: "Erro ao inativar usuário" });
        }
        res.status(200).json({ message: "Usuário inativado com sucesso!" });
    });
}