import api from './api';

export const deckShareApi = {
    generateShareCode: (deckId: number, expiresInDays?: number | null, maxUses?: number | null) =>
        api.post('/api/deck-share/generate', {
            deckId,
            expiresInDays: expiresInDays || undefined,
            maxUses: maxUses || undefined
        }),

    useShareCode: (shareCode: string) => {
        return api.post('/api/deck-share/use', { shareCode });
    },

    getMyShareCodes: () =>
        api.get('/api/deck-share/my-codes'),

    revokeShareCode: (shareId: number) =>
        api.put(`/api/deck-share/revoke/${shareId}`),

    getDeckPreview: (shareCode: string) =>
        api.get(`/api/deck-share/preview/${shareCode}`)
};