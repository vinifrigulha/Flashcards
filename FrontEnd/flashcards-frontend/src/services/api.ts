import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Deck, Card, AuthResponse, LoginData, RegisterData } from '../types';

// Configuração base da API
const API_BASE_URL = 'http://localhost:3000';

// Instância do axios com configurações base
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para adicionar token automaticamente às requisições
api.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Erro ao recuperar token:', error);
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor para tratar respostas de erro
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            try {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('user');
            } catch (storageError) {
                console.error('Erro ao limpar storage:', storageError);
            }
        }
        return Promise.reject(error);
    }
);

// Serviços de Autenticação - CORRIGIDAS
export const authAPI = {
    /**
     * Registra um novo usuário
     */
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/register', data);
        return response.data;
    },

    /**
     * Realiza login do usuário
     */
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/login', data);
        return response.data;
    },

    /**
     * Valida token (opcional - se quiser verificar se o token ainda é válido)
     */
    validateToken: async (): Promise<{ valid: boolean }> => {
        const response = await api.get('/api/auth/validate');
        return response.data;
    },
};

// Serviços de Decks - CORRIGIDAS
export const deckAPI = {
    /**
     * Busca todos os decks do usuário logado
     */
    getDecks: async (): Promise<Deck[]> => {
        const response = await api.get('/api/decks');
        return response.data;
    },

    /**
     * Busca um deck específico pelo ID
     */
    getDeckById: async (deckId: number): Promise<Deck> => {
        const response = await api.get(`/api/decks/${deckId}`);
        return response.data;
    },

    /**
     * Cria um novo deck
     */
    createDeck: async (data: { title: string; description?: string }): Promise<Deck> => {
        const response = await api.post('/api/decks', data);
        return response.data;
    },

    /**
     * Atualiza um deck existente
     */
    updateDeck: async (deckId: number, data: { title: string; description?: string }): Promise<Deck> => {
        const response = await api.put(`/api/decks/${deckId}`, data);
        return response.data;
    },

    /**
     * Deleta um deck
     */
    deleteDeck: async (deckId: number): Promise<void> => {
        await api.delete(`/api/decks/${deckId}`);
    },
};

// Serviços de Cards - CORRIGIDAS (mantendo as rotas originais)
export const cardAPI = {
    /**
     * Busca todos os cards de um deck específico
     */
    getCards: async (deckId: number): Promise<Card[]> => {
        const response = await api.get(`/api/decks/${deckId}/cards`);
        return response.data;
    },

    /**
     * Cria um novo card em um deck
     */
    createCard: async (deckId: number, data: {
        question?: string | null;
        questionImage?: string | null;
        answer: string;
    }): Promise<Card> => {
        const response = await api.post(`/api/decks/${deckId}/cards`, data);
        return response.data;
    },

    /**
     * Atualiza um card existente - CORREÇÃO AQUI
     */
    updateCard: async (deckId: number, cardId: number, data: {
        question?: string | null;
        questionImage?: string | null;
        answer: string;
    }): Promise<Card> => {
        const response = await api.put(`/api/decks/${deckId}/cards/${cardId}`, data);
        return response.data;
    },

    /**
     * Deleta um card - CORREÇÃO AQUI
     */
    deleteCard: async (deckId: number, cardId: number): Promise<void> => {
        await api.delete(`/api/decks/${deckId}/cards/${cardId}`);
    },

    /**
     * Deleta todos os cards de um deck
     */
    deleteAllCardsFromDeck: async (deckId: number) => {
        const response = await api.delete(`/api/decks/${deckId}/cards`);
        return response.data;
    },

    /**
     * Busca cards para estudo
     */
    getCardsForStudy: async (deckId: number): Promise<Card[]> => {
        const response = await api.get(`/api/decks/${deckId}/study`);
        return response.data;
    },
};

// Utilitários da API
export const apiUtils = {
    /**
     * Define o token de autenticação manualmente
     */
    setAuthToken: async (token: string) => {
        await AsyncStorage.setItem('userToken', token);
    },

    /**
     * Remove o token de autenticação
     */
    removeAuthToken: async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
    },

    /**
     * Verifica se existe um token salvo
     */
    hasAuthToken: async (): Promise<boolean> => {
        const token = await AsyncStorage.getItem('userToken');
        return !!token;
    },

    /**
     * Obtém o token salvo
     */
    getAuthToken: async (): Promise<string | null> => {
        return await AsyncStorage.getItem('userToken');
    },
};

// Exporta a instância do axios para uso em casos específicos
export default api;