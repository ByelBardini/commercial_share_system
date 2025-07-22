import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import authRoutes from "./routes/authRoutes.js";
import cidadeRoutes from "./routes/cidadeRoutes.js";

dotenv.config({path: '../.env'});

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

export default app;