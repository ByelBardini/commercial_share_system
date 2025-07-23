import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import cidadeRoutes from "./routes/cidadeRoutes.js";
import associacaoRoutes from "./routes/associacaoRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1 * 1000 * 60 * 24,
      httpOnly: true,
      sameSite: "Lax",
      secure: false,
      path: "/",
    },
  })
);
app.use(cors());

app.use(authRoutes);
app.use(cidadeRoutes);
app.use(associacaoRoutes);
app.use(usuarioRoutes);

export default app;