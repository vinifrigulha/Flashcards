import express from "express";
import {
  createCard,
  getCards,
  updateCard,
  deleteCard,
  deleteAllCardsFromDeck
} from "../controllers/cardController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Todas as rotas exigem autenticação
router.use(authenticateToken);

// Rotas de CRUD para cards
router.post("/:deckId/cards", createCard); // Criar card em um deck
router.get("/:deckId/cards", getCards); // Listar cards de um deck
router.put("/:deckId/cards/:cardId", updateCard); // Atualizar card específico
router.delete("/:deckId/cards/:cardId", deleteCard); // Deletar card específico
router.delete("/:deckId/cards", deleteAllCardsFromDeck); // Deletar todos os cards

export default router;