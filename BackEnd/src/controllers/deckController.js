import prisma from "../prisma.js";

// Criar um novo deck
export const createDeck = async (req, res) => {
  const { title, description } = req.body;
  const userId = req.user.userId;

  try {
    const deck = await prisma.deck.create({
      data: { title, description, userId },
    });
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
        // Busca o deck atual para verificar se é um deck compartilhado (cópia)
        const currentDeck = await prisma.deck.findFirst({
            where: {
                id: parseInt(deckId),
                userId: userId
            }
        });

        if (!currentDeck) {
            return res.status(404).json({ error: "Deck não encontrado." });
        }

        const isSharedDeck = currentDeck.title.startsWith('Cópia - ');

        // Se NÃO for um deck compartilhado, verifica conflito apenas com decks próprios
        if (!isSharedDeck) {
            const existingOwnDeck = await prisma.deck.findFirst({
                where: {
                    title: title.trim(),
                    userId: userId,
                    NOT: {
                        id: parseInt(deckId),
                        title: { startsWith: 'Cópia - ' } // Ignora decks compartilhados
                    }
                }
            });

            if (existingOwnDeck) {
                return res.status(400).json({ 
                    error: "Já existe um deck próprio com este nome." 
                });
            }
        }

        // Prepara os dados de atualização
        const updateData = { 
            title: title.trim(),
            // ✅ NÃO altera o isPublic - mantém o valor original
            isPublic: currentDeck.isPublic
        };
        
        // Se description está presente, trata string vazia como null
        if (description !== undefined) {
            updateData.description = description === '' ? null : description;
        }

        const deck = await prisma.deck.update({
            where: { id: parseInt(deckId) },
            data: updateData,
        });
        res.json(deck);
    } catch (err) {
        // Verifica se é erro de constraint única do Prisma
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
    const decks = await prisma.deck.findMany({
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
    res.json(decks);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar decks." });
  }
};

// Deletar um deck
export const deleteDeck = async (req, res) => {
  const { deckId } = req.params;
  const userId = req.user.userId; // ✅ VERIFICAR se o deck pertence ao usuário

  try {
    // ✅ PRIMEIRO: Verificar se o deck existe e pertence ao usuário
    const deck = await prisma.deck.findFirst({
      where: { 
        id: parseInt(deckId),
        userId: userId 
      }
    });

    if (!deck) {
      return res.status(404).json({ error: "Deck não encontrado." });
    }

    // ✅ SEGUNDO: Excluir em transação para garantir consistência
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Excluir DeckShares relacionados
      await prisma.deckShare.deleteMany({
        where: { deckId: parseInt(deckId) }
      });

      // 2. Excluir Cards relacionados
      await prisma.card.deleteMany({
        where: { deckId: parseInt(deckId) }
      });

      // 3. Excluir o Deck
      const deletedDeck = await prisma.deck.delete({
        where: { id: parseInt(deckId) }
      });

      return deletedDeck;
    });

    res.json({ message: "Deck deletado com sucesso!" });

  } catch (err) {
    console.error('❌ Erro ao deletar deck:', err);
    console.error('Código do erro:', err.code);
    console.error('Mensagem do erro:', err.message);
    
    // Mensagem de erro mais específica
    let errorMessage = "Erro ao deletar deck.";
    if (err.code === 'P2025') {
      errorMessage = "Deck não encontrado.";
    } else if (err.message.includes('Foreign key constraint')) {
      errorMessage = "Erro de constraint - há registros dependentes.";
    }
    
    res.status(500).json({ error: errorMessage });
  }
};
