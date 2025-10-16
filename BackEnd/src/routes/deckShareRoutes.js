import express from "express";
import {
  generateShareCode,
  useShareCode,
  getUserShareCodes,
  revokeShareCode,
  getDeckByShareCode
} from "../controllers/deckShareController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apenas usuários autenticados podem compartilhar
router.use(authenticateToken);

// Rotas para sistema de compartilhamento
router.post("/generate", generateShareCode); // Gerar novo código
router.post("/use", useShareCode); // Usar código para copiar deck
router.get("/my-codes", getUserShareCodes); // Listar códigos do usuário
router.put("/revoke/:shareId", revokeShareCode); // Revogar código
router.get("/preview/:shareCode", getDeckByShareCode); // Pré-visualizar deck

export default router;