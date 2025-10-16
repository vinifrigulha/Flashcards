import prisma from "../prisma.js";

export const cardModel = {
  // Cria um novo card no banco de dados
  async createCard(cardData) {
    return await prisma.card.create({
      data: cardData,
    });
  },

  // Atualiza um card existente verificando o deck
  async updateCard(cardId, deckId, updateData) {
    return await prisma.card.update({
      where: { 
        id: cardId,
        deckId: deckId // Garante que o card pertence ao deck
      },
      data: updateData,
    });
  },

  // Busca todos os cards de um deck específico
  async findCardsByDeck(deckId) {
    return await prisma.card.findMany({
      where: { deckId: deckId },
    });
  },

  // Remove um card específico com verificação de deck
  async deleteCard(cardId, deckId) {
    return await prisma.card.delete({ 
      where: { 
        id: cardId,
        deckId: deckId
      } 
    });
  },

  // Remove todos os cards de um deck (limpeza em massa)
  async deleteAllCardsFromDeck(deckId) {
    return await prisma.card.deleteMany({
      where: { deckId: deckId },
    });
  },

  // Busca um card específico com verificação de deck
  async findCardById(cardId, deckId) {
    return await prisma.card.findFirst({
      where: { 
        id: cardId,
        deckId: deckId
      }
    });
  }
};