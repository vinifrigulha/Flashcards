import express from "express";
import {
  createDeck,
  getDecks,
  updateDeck,
  deleteDeck,
} from "../controllers/deckController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protege todas as rotas com autenticação
router.use(authenticateToken);

// Rotas para gerenciamento de decks
router.post("/", createDeck); // Criar novo deck
router.get("/", getDecks); // Listar decks do usuário
router.put("/:deckId", updateDeck); // Atualizar deck específico
router.delete("/:deckId", deleteDeck); // Deletar deck e seus cards

export default router;