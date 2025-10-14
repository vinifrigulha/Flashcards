export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

export interface Deck {
    id: number;
    title: string;
    description?: string | null;
    userId: number;
    cards: Card[];
    isPublic: boolean;
    createdAt: string;
}

export interface Card {
    id: number;
    question?: string | null;
    questionImage?: string | null;
    answer: string;
    deckId: number;
    createdAt: string;
}

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

export interface AuthResponse {
    token?: string;
    user: User;
    message?: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface ApiError {
    error: string;
    details?: string;
    statusCode?: number;
}

// Re-export dos tipos de navegação
export * from './navigation';