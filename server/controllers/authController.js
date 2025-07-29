import { Usuario } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const CHAVE = process.env.SECRET_KEY_LOGIN;

async function gerarTokens(res, usuario_id) {
  const accessToken = jwt.sign({ usuario_id: usuario_id }, CHAVE, {
    expiresIn: "10m",
  });
  const refreshToken = uuidv4();

  const usuario = await Usuario.findByPk(usuario_id);
  if (!usuario) {
    return res.status(404).json({
      error: "Usuário não encontrado, fale com um administrador do sistema",
    });
  }
  await usuario.update({
    usuario_refresh_token: refreshToken,
  });

  return { accessToken, refreshToken };
}

export async function login(req, res) {
  const { usuario_login, usuario_senha } = req.body;

  if (!usuario_login || !usuario_senha) {
    return res.status(400).json({ error: "Login e senha são obrigatórios." });
  }

  try {
    const usuario = await Usuario.findOne({
      where: { usuario_login: usuario_login },
    });

    if (!usuario) {
      return res.status(401).json({ error: "Login Incorreto" });
    }

    if (usuario.usuario_ativo == 0) {
      return res.status(403).json({ error: "Usuário inativo" });
    }

    const match = await bcrypt.compare(usuario_senha, usuario.usuario_senha);

    if (!match) {
      return res.status(401).json({ error: "Usuário ou senha inválidos." });
    }
    const userSession = {
      usuario_id: usuario.usuario_id,
      usuario_role: usuario.usuario_role,
    };

    const resposta = {
      usuario_nome: usuario.usuario_nome,
      usuario_troca_senha: usuario.usuario_troca_senha,
      usuario_role: usuario.usuario_role,
    };

    const { accessToken, refreshToken } = await gerarTokens(
      res,
      usuario.usuario_id
    );

    req.session.user = userSession;

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "Lax",
        secure: false,
        path: "/",
      })
      .status(200)
      .json(resposta);
  } catch (err) {
    console.error("Erro na consulta:", err);
    return res.status(500).json({ error: "Erro ao validar usuário" });
  }
}

export const logout = async (req, res) => {
  if (req.session && req.session.user) {
    const usuario = await Usuario.findByPk(req.session.user.usuario_id);
    if (usuario) {
      await usuario.update({ usuario_refresh_token: null });
    }
  }
  if (req.session) req.session.destroy(() => {});
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  return res.json({ mensagem: "Logout realizado com sucesso" });
};

export async function validaSessao(req, res) {
  const sessionUser = req.session?.user;
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: "Tokens não fornecidos." });
  }

  if (!sessionUser || !sessionUser.usuario_id) {
    return res
      .status(401)
      .json({ error: "Sessão não encontrada ou inválida." });
  }

  jwt.verify(accessToken, CHAVE, async (err, decoded) => {
    if (err) {
      try {
        const usuario = await Usuario.findOne({
          where: { usuario_refresh_token: refreshToken },
        });
        if (!usuario) {
          return res.status(403).json({ error: "Sessão inválida" });
        }
        const accessToken = jwt.sign(
          { usuario_id: usuario.usuario_id },
          CHAVE,
          {
            expiresIn: "10m",
          }
        );

        res.cookie("accessToken", accessToken, {
          httpOnly: true,
          sameSite: "Lax",
          secure: false,
          path: "/",
        });
        res.status(200).json({ mensagem: "Sessão válida" });
      } catch (err) {
        return res.status(403).json({ mensagem: "Sessão inválida" });
      }
    } else if (decoded) {
      res.status(200).json({ mensagem: "Sessão válida" });
    }
  });
}
