import api from './api';

// Serviços específicos para funcionalidades de compartilhamento de decks
export const deckShareApi = {
    // Gera um código único para compartilhar um deck com outros usuários
    generateShareCode: (deckId: number, expiresInDays?: number | null, maxUses?: number | null) =>
        api.post('/api/deck-share/generate', {
            deckId,
            expiresInDays: expiresInDays || undefined,
            maxUses: maxUses || undefined
        }),

    // Utiliza um código de compartilhamento para copiar um deck
    useShareCode: (shareCode: string) => {
        return api.post('/api/deck-share/use', { shareCode });
    },

    // Lista todos os códigos de compartilhamento gerados pelo usuário
    getMyShareCodes: () =>
        api.get('/api/deck-share/my-codes'),

    // Revoga (desativa) um código de compartilhamento específico
    revokeShareCode: (shareId: number) =>
        api.put(`/api/deck-share/revoke/${shareId}`),

    // Busca informações de preview de um deck antes de copiá-lo
    getDeckPreview: (shareCode: string) =>
        api.get(`/api/deck-share/preview/${shareCode}`)
};