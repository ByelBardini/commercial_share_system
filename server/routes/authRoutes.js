import { login, logout } from "./../controllers/authController.js";
import verificaToken from "../middlewares/verificaToken.js";
import express from "express";

const router = express.Router();

router.post("/login", verificaToken, login);
router.get("/logout", verificaToken, logout);

export default router;