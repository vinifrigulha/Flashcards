import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import deckRoutes from "./src/routes/deckRoutes.js";
import cardRoutes from "./src/routes/cardRoutes.js";
import uploadRoutes from "./src/routes/uploadRoutes.js";
import deckShareRoutes from "./src/routes/deckShareRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

// Configura variáveis de ambiente
dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura CORS para aceitar requisições dos frontends
app.use(cors({
    origin: ['http://localhost:8081', 'http://localhost:3000'],
    credentials: true
}));

// Configura parsing de JSON com limite aumentado
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve arquivos estáticos (imagens uploadadas)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define todas as rotas da API
app.use("/api/auth", authRoutes); // Autenticação
app.use("/api/decks", deckRoutes); // Gerenciamento de decks
app.use("/api/decks", cardRoutes); // Gerenciamento de cards
app.use("/api/upload", uploadRoutes); // Upload de imagens
app.use("/api/deck-share", deckShareRoutes); // Compartilhamento

const PORT = process.env.PORT || 3000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});