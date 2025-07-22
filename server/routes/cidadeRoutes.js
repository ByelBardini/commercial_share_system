import { getCidades, postCidade, putCidade, deleteCidade } from "../controllers/authController.js";
import verificaToken from "../middlewares/verificaToken.js";
import express from "express";

const router = express.Router();

router.get("/cidade", verificaToken, getCidades);
router.post("/cidade", verificaToken, postCidade);
router.put("/cidade/:id", verificaToken, putCidade);
router.delete("/cidade/:id", verificaToken, deleteCidade);

export default router;