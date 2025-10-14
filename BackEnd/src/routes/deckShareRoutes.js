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

router.use(authenticateToken);

// Rotas de Compartilhamento
router.post("/generate", generateShareCode);
router.post("/use", useShareCode);
router.get("/my-codes", getUserShareCodes);
router.put("/revoke/:shareId", revokeShareCode);
router.get("/preview/:shareCode", getDeckByShareCode);

export default router;