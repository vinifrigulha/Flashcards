// Interface para usuário do sistema
export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

// Interface para decks de estudo
export interface Deck {
    id: number;
    title: string;
    description?: string | null;
    userId: number;
    cards: Card[];
    isPublic: boolean;
    createdAt: string;
}

// Interface para cards individuais (perguntas e respostas)
export interface Card {
    id: number;
    question?: string | null;
    questionImage?: string | null;
    answer: string;
    deckId: number;
    createdAt: string;
}

// Interface para códigos de compartilhamento de decks
export interface DeckShare {
    id: number;
    shareCode: string;
    deckId: number;
    deck: {
        title: string;
        description: string | null;
        isPublic: boolean;
    };
    expiresAt: string | null;
    maxUses: number | null;
    useCount: number;
    isActive: boolean;
    createdAt: string;
}

// Interface para preview de deck antes da cópia
export interface DeckPreview {
    id: number;
    title: string;
    description: string | null;
    cardCount: number;
    author: string;
    expiresAt: string | null;
    maxUses: number | null;
    useCount: number;
    isPublic: boolean;
}

// Interface para respostas de autenticação
export interface AuthResponse {
    token?: string;
    user: User;
    message?: string;
}

// Dados necessários para login
export interface LoginData {
    email: string;
    password: string;
}

// Dados necessários para registro de novo usuário
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

// Interface padronizada para erros da API
export interface ApiError {
    error: string;
    details?: string;
    statusCode?: number;
}

// Re-export dos tipos de navegação para facilitar imports
export * from './navigation';