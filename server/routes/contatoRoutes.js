import { getContatos, postContatos, putContato, deleteContato } from "../controllers/contatoController.js";
import verificaToken from "../middlewares/verificaToken.js";
import express from "express";

const router = express.Router();

router.get("/contato/:id", verificaToken, getContatos);
router.post("/contato", verificaToken, postContatos);
router.put("/Contato/:id", verificaToken, putContato);
router.delete("/Contato/:id", verificaToken, deleteContato);

export default router;