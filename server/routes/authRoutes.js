import { login, logout, validaSessao } from "./../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/valida", validaSessao);

export default router;