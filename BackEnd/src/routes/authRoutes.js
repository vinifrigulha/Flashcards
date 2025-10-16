import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

// Rotas públicas de autenticação
router.post("/register", register); // Cadastro de novo usuário
router.post("/login", login); // Login de usuário existente

export default router;