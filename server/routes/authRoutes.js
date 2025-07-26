import { login, logout, refreshToken } from "./../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", refreshToken);

export default router;