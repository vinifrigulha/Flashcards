import prisma from "../prisma.js";

export const deckModel = {
  // Cria um novo deck para o usuário
  async createDeck(deckData) {
    return await prisma.deck.create({
      data: deckData,
    });
  },

  // Atualiza informações do deck
  async updateDeck(deckId, updateData) {
    return await prisma.deck.update({
      where: { id: deckId },
      data: updateData,
    });
  },

  // Busca deck por ID, opcionalmente filtrando por usuário
  async findDeckById(deckId, userId = null) {
    const where = { id: deckId };
    if (userId) where.userId = userId; // Filtro de segurança
    
    return await prisma.deck.findFirst({ where });
  },

  // Lista todos os decks do usuário com seus relacionamentos
  async findUserDecks(userId) {
    return await prisma.deck.findMany({
      where: { userId },
      include: { 
        cards: true, // Inclui todos os cards
        shares: {
          where: { isActive: true }, // Apenas códigos ativos
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

  // Remove deck e todos os dados relacionados em transação
  async deleteDeckWithRelations(deckId) {
    return await prisma.$transaction(async (prisma) => {
      // Remove primeiro os compartilhamentos
      await prisma.deckShare.deleteMany({
        where: { deckId: deckId }
      });

      // Remove todos os cards do deck
      await prisma.card.deleteMany({
        where: { deckId: deckId }
      });

      // Finalmente remove o deck
      return await prisma.deck.delete({
        where: { id: deckId }
      });
    });
  },

  // Busca deck por título para verificar duplicatas
  async findDeckByTitle(title, userId) {
    return await prisma.deck.findFirst({
      where: { 
        title: title.trim(),
        userId: userId
      }
    });
  }
};