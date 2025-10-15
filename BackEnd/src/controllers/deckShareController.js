import { deckShareModel } from "../models/deckShareModel.js";
import { deckModel } from "../models/deckModel.js";

// Gerar código de compartilhamento
export const generateShareCode = async (req, res) => {
  try {
    const { deckId, expiresInDays = 7, maxUses = null } = req.body;
    const userId = req.user.userId;

    // Verificar se o deck pertence ao usuário
    const deck = await deckModel.findDeckById(parseInt(deckId), userId);
    if (!deck) {
      return res.status(404).json({ error: 'Deck não encontrado' });
    }

    // Gerar código único
    const shareCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const shareData = {
      deckId: parseInt(deckId),
      createdById: userId,
      shareCode,
      expiresAt: expiresInDays ? 
        new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000) : null,
      maxUses: maxUses ? parseInt(maxUses) : null
    };

    const deckShare = await deckShareModel.createShare(shareData);

    res.json({
      shareCode,
      expiresAt: deckShare.expiresAt,
      maxUses: deckShare.maxUses,
      deck: deckShare.deck
    });

  } catch (error) {
    console.error('Erro ao gerar código:', error);
    res.status(500).json({ error: 'Erro ao gerar código de compartilhamento' });
  }
};

// Usar código de compartilhamento (copiar deck)
export const useShareCode = async (req, res) => {
  try {
    const { shareCode } = req.body;
    const userId = req.user.userId;

    // Buscar código válido
    const deckShare = await deckShareModel.findActiveShareByCode(shareCode);
    if (!deckShare) {
      return res.status(404).json({ error: 'Código inválido ou expirado' });
    }

    // Verificar limite de usos
    if (deckShare.maxUses && deckShare.useCount >= deckShare.maxUses) {
      return res.status(400).json({ error: 'Limite de usos atingido' });
    }

    // Verificar se o usuário já tem uma cópia
    const existingCopy = await deckModel.findDeckByTitle(
      `Cópia - ${deckShare.deck.title}`, 
      userId
    );

    if (existingCopy) {
      return res.status(400).json({ error: 'Você já tem uma cópia deste deck' });
    }

    // Criar cópia do deck
    const copiedDeck = await deckModel.createDeck({
      title: `Cópia - ${deckShare.deck.title}`,
      description: deckShare.deck.description,
      userId: userId,
      cards: {
        create: deckShare.deck.cards.map(card => ({
          question: card.question,
          questionImage: card.questionImage,
          answer: card.answer
        }))
      }
    });

    // Incrementar contador de usos
    await deckShareModel.incrementUseCount(deckShare.id);

    res.json({ 
      message: 'Deck copiado com sucesso!',
      deck: copiedDeck,
      originalAuthor: deckShare.deck.user.name
    });

  } catch (error) {
    console.error('Erro ao usar código:', error);
    res.status(500).json({ error: 'Erro ao usar código de compartilhamento' });
  }
};

// Listar códigos gerados pelo usuário
export const getUserShareCodes = async (req, res) => {
  try {
    const userId = req.user.userId;
    const shareCodes = await deckShareModel.findUserShares(userId);
    res.json(shareCodes);
  } catch (error) {
    console.error('Erro ao buscar códigos:', error);
    res.status(500).json({ error: 'Erro ao buscar códigos' });
  }
};

// Revogar código
export const revokeShareCode = async (req, res) => {
  try {
    const { shareId } = req.params;
    const userId = req.user.userId;

    const deckShare = await deckShareModel.findShareById(parseInt(shareId), userId);
    if (!deckShare) {
      return res.status(404).json({ error: 'Código não encontrado' });
    }

    await deckShareModel.updateShare(parseInt(shareId), { isActive: false });
    res.json({ message: 'Código revogado com sucesso' });
  } catch (error) {
    console.error('Erro ao revogar código:', error);
    res.status(500).json({ error: 'Erro ao revogar código' });
  }
};

// Buscar informações do deck por código (para preview)
export const getDeckByShareCode = async (req, res) => {
  try {
    const { shareCode } = req.params;

    const deckShare = await deckShareModel.findActiveShareByCode(shareCode);
    if (!deckShare) {
      return res.status(404).json({ error: 'Código inválido ou expirado' });
    }

    const deckInfo = {
      id: deckShare.deck.id,
      title: deckShare.deck.title,
      description: deckShare.deck.description,
      cardCount: deckShare.deck.cards.length,
      author: deckShare.deck.user.name,
      expiresAt: deckShare.expiresAt,
      maxUses: deckShare.maxUses,
      useCount: deckShare.useCount
    };

    res.json(deckInfo);
  } catch (error) {
    console.error('Erro ao buscar deck:', error);
    res.status(500).json({ error: 'Erro ao buscar deck' });
  }
};