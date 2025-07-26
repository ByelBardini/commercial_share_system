import { login, logout, comparaRefreshToken } from "./../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", login);
router.get("/logout", logout);
router.get("/refresh", comparaRefreshToken);

export default router;