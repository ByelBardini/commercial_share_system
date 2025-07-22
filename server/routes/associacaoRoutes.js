import { getAssociacaoFull, getAssociacoesPorCidade, postAssociacao, putAssociacao, deleteAssociacao } from "../controllers/associacaoController.js";
import verificaToken from "../middlewares/verificaToken.js";
import express from "express";

const router = express.Router();

router.get("/associacao/cidade/:id", verificaToken, getAssociacoesPorCidade);
router.get("/associacao/:id", verificaToken, getAssociacaoFull);
router.post("/associacao", verificaToken, postAssociacao);
router.put("/associacao/:id", verificaToken, putAssociacao);
router.delete("/associacao/:id", verificaToken, deleteAssociacao);

export default router;