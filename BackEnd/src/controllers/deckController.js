import { deckModel } from "../models/deckModel.js";

// Cria um novo deck para organizar os cards
export const createDeck = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId; // ID do usuário autenticado

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

// Atualiza as informações de um deck existente
export const updateDeck = async (req, res) => {
  const { deckId } = req.params;
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    // Verifica se o deck existe e pertence ao usuário
    const currentDeck = await deckModel.findDeckById(parseInt(deckId), userId);
    if (!currentDeck) {
      return res.status(404).json({ error: "Deck não encontrado." });
    }

    // Identifica se é um deck compartilhado (cópia)
    const isSharedDeck = currentDeck.title.startsWith('Cópia - ');

    // Para decks próprios, verifica conflito de nomes
    if (!isSharedDeck) {
      const existingOwnDeck = await deckModel.findDeckByTitle(title, userId);
      if (existingOwnDeck && existingOwnDeck.id !== parseInt(deckId)) {
        return res.status(400).json({ 
          error: "Já existe um deck próprio com este nome." 
        });
      }
    }

    const updateData = { 
      title: title.trim(),
      isPublic: currentDeck.isPublic // Mantém a configuração de visibilidade
    };
    
    // Permite descrição vazia (converte para null)
    if (description !== undefined) {
      updateData.description = description === '' ? null : description;
    }

    const deck = await deckModel.updateDeck(parseInt(deckId), updateData);
    res.json(deck);
  } catch (err) {
    // Trata erro de título duplicado no banco
    if (err.code === 'P2002') {
      return res.status(400).json({ 
        error: "Já existe um deck com este nome." 
      });
    }
    res.status(500).json({ error: "Erro ao atualizar deck." });
  }
};

// Lista todos os decks do usuário autenticado
export const getDecks = async (req, res) => {
  const userId = req.user.userId;

  try {
    const decks = await deckModel.findUserDecks(userId);
    res.json(decks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar decks." });
  }
};

// Remove um deck e todos os seus relacionamentos
export const deleteDeck = async (req, res) => {
  const { deckId } = req.params;
  const userId = req.user.userId;

  try {
    // Verifica permissão antes de deletar
    const deck = await deckModel.findDeckById(parseInt(deckId), userId);
    if (!deck) {
      return res.status(404).json({ error: "Deck não encontrado." });
    }

    // Remove deck, cards e compartilhamentos em transação
    await deckModel.deleteDeckWithRelations(parseInt(deckId));
    res.json({ message: "Deck deletado com sucesso!" });

  } catch (err) {
    // Trata diferentes tipos de erro de banco
    let errorMessage = "Erro ao deletar deck.";
    if (err.code === 'P2025') {
      errorMessage = "Deck não encontrado.";
    } else if (err.message.includes('Foreign key constraint')) {
      errorMessage = "Erro de constraint - há registros dependentes.";
    }
    res.status(500).json({ error: errorMessage });
  }
};