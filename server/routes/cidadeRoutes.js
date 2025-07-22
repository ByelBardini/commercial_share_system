import { getCidades, postCidade } from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.get("/cidade", getCidades);
router.post("/cidade", postCidade);

export default router;