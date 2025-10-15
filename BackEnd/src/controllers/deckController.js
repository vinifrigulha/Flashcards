import { deckModel } from "../models/deckModel.js";

// Criar um novo deck
export const createDeck = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    const deckData = { 
      title: title.trim(), 
      description: description?.trim() || null, 
      userId 
    };
    
    const deck = await deckModel.createDeck(deckData);
    res.json(deck);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar deck.", details: err.message });
  }
};

// Atualizar um deck
export const updateDeck = async (req, res) => {
  const { deckId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    // Busca o deck atual
    const currentDeck = await deckModel.findDeckById(parseInt(deckId), userId);
    if (!currentDeck) {
      return res.status(404).json({ error: "Deck não encontrado." });
    }

    const isSharedDeck = currentDeck.title.startsWith('Cópia - ');

    // Se NÃO for um deck compartilhado, verifica conflito
    if (!isSharedDeck) {
      const existingOwnDeck = await deckModel.findDeckByTitle(title, userId);
      if (existingOwnDeck && existingOwnDeck.id !== parseInt(deckId)) {
        return res.status(400).json({ 
          error: "Já existe um deck próprio com este nome." 
        });
      }
    }

    // Prepara os dados de atualização
    const updateData = { 
      title: title.trim(),
      isPublic: currentDeck.isPublic
    };
    
    if (description !== undefined) {
      updateData.description = description === '' ? null : description;
    }

    const deck = await deckModel.updateDeck(parseInt(deckId), updateData);
    res.json(deck);
  } catch (err) {
    if (err.code === 'P2002') {
      return res.status(400).json({ 
        error: "Já existe um deck com este nome." 
      });
    }
    res.status(500).json({ error: "Erro ao atualizar deck." });
  }
};

// Listar todos os decks do usuário
export const getDecks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const decks = await deckModel.findUserDecks(userId);
    res.json(decks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar decks." });
  }
};

// Deletar um deck
export const deleteDeck = async (req, res) => {
  const { deckId } = req.params;
  const userId = req.user.userId;

  try {
    const deck = await deckModel.findDeckById(parseInt(deckId), userId);
    if (!deck) {
      return res.status(404).json({ error: "Deck não encontrado." });
    }

    await deckModel.deleteDeckWithRelations(parseInt(deckId));
    res.json({ message: "Deck deletado com sucesso!" });

  } catch (err) {
    let errorMessage = "Erro ao deletar deck.";
    if (err.code === 'P2025') {
      errorMessage = "Deck não encontrado.";
    } else if (err.message.includes('Foreign key constraint')) {
      errorMessage = "Erro de constraint - há registros dependentes.";
    }
    res.status(500).json({ error: errorMessage });
  }
};