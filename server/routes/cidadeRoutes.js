import {
  getCidades,
  postCidade,
  putCidade,
  favoritaCidade,
  deleteCidade,
  getEstados,
  getUfs,
} from "../controllers/cidadeController.js";
import verificaToken from "../middlewares/verificaToken.js";
import express from "express";

const router = express.Router();

router.get("/cidade", verificaToken, getCidades);
router.get("/estado", verificaToken, getEstados);
router.get("/uf", verificaToken, getUfs);
router.post("/cidade", verificaToken, postCidade);
router.put("/cidade/:id", verificaToken, putCidade);
router.put("/cidade/favorita/:id", verificaToken, favoritaCidade);
router.delete("/cidade/:id", verificaToken, deleteCidade);

export default router;
