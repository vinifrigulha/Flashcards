import prisma from "../prisma.js";

// Criar um novo card dentro de um deck
export const createCard = async (req, res) => {
  const { deckId } = req.params;
  const { question, questionImage, answer } = req.body;

  try {
    // Validação: pelo menos texto OU imagem na pergunta
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

    const card = await prisma.card.create({
      data: {
        question: question?.trim() || null, // Pode ser null
        questionImage: questionImage?.trim() || null,
        answer: answer.trim(),
        deckId: parseInt(deckId),
      },
    });
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Erro ao criar card." });
  }
};

// Atualizar um card
export const updateCard = async (req, res) => {
    const { deckId, cardId } = req.params; // ← Agora recebe deckId também
    const { question, questionImage, answer } = req.body;

    try {
        // Validação: pelo menos texto OU imagem na pergunta
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

        const card = await prisma.card.update({
            where: { 
                id: parseInt(cardId),
                deckId: parseInt(deckId) // ← Garante que o card pertence ao deck
            },
            data: { 
                question: question?.trim() || null,
                questionImage: questionImage?.trim() || null,
                answer: answer.trim()
            },
        });
        res.json(card);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar card." });
    }
};

// Listar todos os cards de um deck
export const getCards = async (req, res) => {
  const { deckId } = req.params;

  try {
    const cards = await prisma.card.findMany({
      where: { deckId: parseInt(deckId) },
    });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar cards." });
  }
};

// Deletar um card
export const deleteCard = async (req, res) => {
  const { deckId, cardId } = req.params; // ← Agora recebe deckId também

  try {
    await prisma.card.delete({ 
      where: { 
        id: parseInt(cardId),
        deckId: parseInt(deckId) // ← Garante que o card pertence ao deck
      } 
    });
    res.json({ message: "Card deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar card." });
  }
};

// Deletar todos os cards de um deck
export const deleteAllCardsFromDeck = async (req, res) => {
  const { deckId } = req.params;

  try {
    await prisma.card.deleteMany({
      where: { deckId: parseInt(deckId) },
    });
    res.json({ message: "Todos os cards do deck foram deletados!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao deletar cards do deck." });
  }
};
