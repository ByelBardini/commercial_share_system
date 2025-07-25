import { Usuario } from "../models/index.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const CHAVE = process.env.SECRET_KEY_LOGIN;

export async function login(req, res) {
  const { usuario_login, usuario_senha } = req.body;

  if (!usuario_login || !usuario_senha) {
    res
      .status(400)
      .json({ error: "Login e senha são obrigatórios." });
  }

  try{

    const usuario = await Usuario.findOne({where: {usuario_login:usuario_login}});
    
    if( usuario === null ){
      res
        .status(404)
        .json({error: "Login Incorreto"})
    }

    bcrypt.compare(usuario_senha, usuario.usuario_senha, (err, match) => {
      if (err) {
        console.error("Erro ao comparar senhas:", err);
        return res.status(500).json({ error: "Erro ao validar senha" });
      }

      if (match) {
        const payload = {
          usuario_nome: usuario.usuario_nome,
        };
        const userSession = {
          usuario_id: usuario.usuario_id,
          usuario_role: usuario.usuario_role,
        };
        const resposta = {
          usuario_nome: usuario.usuario_nome,
          usuario_troca_senha: usuario.usuario_troca_senha,
        };

        const token = jwt.sign(payload, CHAVE, { expiresIn: "2h" });

        req.session.user = userSession;
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
            sameSite: "Lax",
            secure: false,
            path: "/",
            maxAge: 2 * 60 * 60 * 1000,
          })
          .json(resposta);
      } else {
        res.status(401).json({ error: "Usuário ou senha inválidos." });
      }
    });
  }catch(err){
    console.error("Erro na consulta:", err);
    res
      .status(500)
      .json({ error: "Erro ao validar usuário" });
  }
}

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
