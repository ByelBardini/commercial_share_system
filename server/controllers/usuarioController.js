import db from "../config/db.js";
import bcrypt from "bcrypt";

export const registrarUsuario = (req, res) => {
    const { usuario_nome, usuario_login, usuario_senha, usuario_role } = req.body;

    if(!usuario_nome || !usuario_login || !usuario_senha || !usuario_role) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }
    const senhaHash = bcrypt.hashSync(usuario_senha, 10);
    const sql = `INSERT INTO usuarios (usuario_nome, usuario_login, usuario_senha, usuario_role, usuario)`
}