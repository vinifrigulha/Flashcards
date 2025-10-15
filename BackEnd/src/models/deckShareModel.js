import prisma from "../prisma.js";

export const deckShareModel = {
  async createShare(shareData) {
    return await prisma.deckShare.create({
      data: shareData,
      include: {
        deck: {
          include: {
            cards: true
          }
        }
      }
    });
  },

  async findActiveShareByCode(shareCode) {
    return await prisma.deckShare.findFirst({
      where: { 
        shareCode,
        isActive: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } }
        ]
      },
      include: {
        deck: {
          include: {
            cards: true,
            user: {
              select: {
                name: true,
                email: true
              }
            }
          }
        }
      }
    });
  },

  async findUserShares(userId) {
    return await prisma.deckShare.findMany({
      where: { createdById: userId },
      include: {
        deck: {
          select: {
            title: true,
            description: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  },

  async findShareById(shareId, userId = null) {
    const where = { id: shareId };
    if (userId) where.createdById = userId;
    
    return await prisma.deckShare.findFirst({ where });
  },

  async updateShare(shareId, updateData) {
    return await prisma.deckShare.update({
      where: { id: shareId },
      data: updateData
    });
  },

  async incrementUseCount(shareId) {
    return await prisma.deckShare.update({
      where: { id: shareId },
      data: { useCount: { increment: 1 } }
    });
  }
};