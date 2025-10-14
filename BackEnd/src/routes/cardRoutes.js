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

router.use(authenticateToken);

// Rotas de Cards
router.post("/decks/:deckId/cards", createCard);
router.get("/decks/:deckId/cards", getCards);
router.put("/decks/:deckId/cards/:cardId", updateCard); // ← Inclui deckId
router.delete("/decks/:deckId/cards/:cardId", deleteCard); // ← Inclui deckId
router.delete("/decks/:deckId/cards", deleteAllCardsFromDeck);

export default router;