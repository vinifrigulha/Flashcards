import prisma from "../prisma.js";

export const cardModel = {
  async createCard(cardData) {
    return await prisma.card.create({
      data: cardData,
    });
  },

  async updateCard(cardId, deckId, updateData) {
    return await prisma.card.update({
      where: { 
        id: cardId,
        deckId: deckId
      },
      data: updateData,
    });
  },

  async findCardsByDeck(deckId) {
    return await prisma.card.findMany({
      where: { deckId: deckId },
    });
  },

  async deleteCard(cardId, deckId) {
    return await prisma.card.delete({ 
      where: { 
        id: cardId,
        deckId: deckId
      } 
    });
  },

  async deleteAllCardsFromDeck(deckId) {
    return await prisma.card.deleteMany({
      where: { deckId: deckId },
    });
  },

  async findCardById(cardId, deckId) {
    return await prisma.card.findFirst({
      where: { 
        id: cardId,
        deckId: deckId
      }
    });
  }
};