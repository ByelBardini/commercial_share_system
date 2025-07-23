import jwt from "jsonwebtoken";
import db from "../config/db.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const CHAVE = process.env.SECRET_KEY_LOGIN;

export const login = (req, res) => {
  const { usuario_login, usuario_senha } = req.body;

  if (!usuario_login || !usuario_senha) {
    return res.status(400).json({ error: "Login e senha são obrigatórios." });
  }

  const sql = `SELECT * FROM usuarios WHERE usuario_login = ?`;
  db.query(sql, [usuario_login], (err, results) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res.status(500).json({ error: "Erro ao validar usuário" });
    }

    if (results.length > 0) {
      bcrypt.compare(usuario_senha, results[0].usuario_senha, (err, match) => {
        if (err) {
          console.error("Erro ao comparar senhas:", err);
          return res.status(500).json({ error: "Erro ao validar senha" });
        }

        if (match) {
          const payload = {
            usuario_nome: results[0].usuario_nome
          };

          const token = jwt.sign(payload, CHAVE, { expiresIn: "2h" });
          const userSession = { usuario_id: results[0].usuario_id };

          req.session.user = userSession
          res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            path: "/",
            maxAge: 2 * 60 * 60 * 1000,
          })
          .json(results[0].usuario_nome);
        } else {
          res.status(401).json({ error: "Usuário ou senha inválidos." });
        }
      });
    } else {
      res.status(401).json({ error: "Usuário ou senha inválidos." });
    }
  });
};

export const logout = (req, res) => {
    req.session.destroy((err) => {
    if (err) {
      console.log("Erro ao destruir sessão:", err);
      return res.status(500).json({ error: "Erro ao realizar logout" });
    }
  });
  res.clearCookie("token");
  res.json({ mensagem: "Logout realizado com sucesso" });
};