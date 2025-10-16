import { cardModel } from "../models/cardModel.js";

// Cria um novo card de estudo em um deck específico
export const createCard = async (req, res) => {
  const { deckId } = req.params;
  const { question, questionImage, answer } = req.body;

  try {
    // Valida se a pergunta tem pelo menos texto OU imagem
    if (!question?.trim() && !questionImage?.trim()) {
      return res.status(400).json({ 
        error: "A pergunta deve conter texto ou imagem." 
      });
    }

    // Garante que a resposta não está vazia
    if (!answer?.trim()) {
      return res.status(400).json({ 
        error: "A resposta é obrigatória." 
      });
    }

    const cardData = {
      question: question?.trim() || null,
      questionImage: questionImage?.trim() || null,
      answer: answer.trim(),
      deckId: parseInt(deckId),
    };

    const card = await cardModel.createCard(cardData);
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar card." });
  }
};

// Atualiza um card existente
export const updateCard = async (req, res) => {
  const { deckId, cardId } = req.params;
  const { question, questionImage, answer } = req.body;

  try {
    // Mesma validação da criação para manter consistência
    if (!question?.trim() && !questionImage?.trim()) {
      return res.status(400).json({ 
        error: "A pergunta deve conter texto ou imagem." 
      });
    }

    if (!answer?.trim()) {
      return res.status(400).json({ 
        error: "A resposta é obrigatória." 
      });
    }

    const updateData = { 
      question: question?.trim() || null,
      questionImage: questionImage?.trim() || null,
      answer: answer.trim()
    };

    const card = await cardModel.updateCard(
      parseInt(cardId), 
      parseInt(deckId), 
      updateData
    );
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar card." });
  }
};

// Lista todos os cards de um deck específico
export const getCards = async (req, res) => {
  const { deckId } = req.params;

  try {
    const cards = await cardModel.findCardsByDeck(parseInt(deckId));
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cards." });
  }
};

// Remove um card específico
export const deleteCard = async (req, res) => {
  const { deckId, cardId } = req.params;

  try {
    await cardModel.deleteCard(parseInt(cardId), parseInt(deckId));
    res.json({ message: "Card deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar card." });
  }
};

// Remove todos os cards de um deck (limpeza completa)
export const deleteAllCardsFromDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    await cardModel.deleteAllCardsFromDeck(parseInt(deckId));
    res.json({ message: "Todos os cards do deck foram deletados!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar cards do deck." });
  }
};