import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const CHAVE = process.env.SECRET_KEY_LOGIN;

export function verificaToken(req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ error: "Token não fornecido." });
  }

  jwt.verify(accessToken, CHAVE, (err, decoded) => {
    if (err) {
      
      if (err.name === "TokenExpiredError") {
        console.log("Token expirado.");
      } else if (err.name === "JsonWebTokenError") {
        console.log("Token JWT inválido.");
      } else {
        console.error("Erro ao verificar token:", err);
      }
      return res.status(403).json({ error: "Token inválido ou expirado." });
    }
    req.user = decoded;
    next();
  });
}

export default verificaToken;
