import prisma from "../prisma.js";

export const deckModel = {
  async createDeck(deckData) {
    return await prisma.deck.create({
      data: deckData,
    });
  },

  async updateDeck(deckId, updateData) {
    return await prisma.deck.update({
      where: { id: deckId },
      data: updateData,
    });
  },

  async findDeckById(deckId, userId = null) {
    const where = { id: deckId };
    if (userId) where.userId = userId;
    
    return await prisma.deck.findFirst({ where });
  },

  async findUserDecks(userId) {
    return await prisma.deck.findMany({
      where: { userId },
      include: { 
        cards: true,
        shares: {
          where: { isActive: true },
          select: {
            id: true,
            shareCode: true,
            expiresAt: true,
            useCount: true,
            maxUses: true
          }
        }
      },
    });
  },

  async deleteDeckWithRelations(deckId) {
    return await prisma.$transaction(async (prisma) => {
      await prisma.deckShare.deleteMany({
        where: { deckId: deckId }
      });

      await prisma.card.deleteMany({
        where: { deckId: deckId }
      });

      return await prisma.deck.delete({
        where: { id: deckId }
      });
    });
  },

  async findDeckByTitle(title, userId) {
    return await prisma.deck.findFirst({
      where: { 
        title: title.trim(),
        userId: userId
      }
    });
  }
};