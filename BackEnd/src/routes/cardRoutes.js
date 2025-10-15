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
router.post("/:deckId/cards", createCard);
router.get("/:deckId/cards", getCards);
router.put("/:deckId/cards/:cardId", updateCard);
router.delete("/:deckId/cards/:cardId", deleteCard);
router.delete("/:deckId/cards", deleteAllCardsFromDeck);

export default router;