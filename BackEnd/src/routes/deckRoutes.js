import express from "express";
import {
  createDeck,
  getDecks,
  updateDeck,
  deleteDeck,
} from "../controllers/deckController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authenticateToken);

// Rotas de Decks
router.post("/", createDeck);
router.get("/", getDecks);
router.put("/:deckId", updateDeck);
router.delete("/:deckId", deleteDeck);

export default router;