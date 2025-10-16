import prisma from "../prisma.js";

export const deckShareModel = {
  // Cria um novo código de compartilhamento
  async createShare(shareData) {
    return await prisma.deckShare.create({
      data: shareData,
      include: {
        deck: {
          include: {
            cards: true // Inclui cards para cópia
          }
        }
      }
    });
  },

  // Busca código ativo e válido
  async findActiveShareByCode(shareCode) {
    return await prisma.deckShare.findFirst({
      where: { 
        shareCode,
        isActive: true,
        OR: [
          { expiresAt: null }, // Sem expiração
          { expiresAt: { gt: new Date() } } // Não expirado
        ]
      },
      include: {
        deck: {
          include: {
            cards: true, // Cards para cópia
            user: {
              select: {
                name: true,
                email: true // Informações do autor
              }
            }
          }
        }
      }
    });
  },

  // Lista todos os códigos criados pelo usuário
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
      orderBy: { createdAt: 'desc' } // Mais recentes primeiro
    });
  },

  // Busca código específico com verificação de dono
  async findShareById(shareId, userId = null) {
    const where = { id: shareId };
    if (userId) where.createdById = userId; // Apenas códigos do usuário
    
    return await prisma.deckShare.findFirst({ where });
  },

  // Atualiza informações do código
  async updateShare(shareId, updateData) {
    return await prisma.deckShare.update({
      where: { id: shareId },
      data: updateData
    });
  },

  // Incrementa contador de usos do código
  async incrementUseCount(shareId) {
    return await prisma.deckShare.update({
      where: { id: shareId },
      data: { useCount: { increment: 1 } }
    });
  }
};