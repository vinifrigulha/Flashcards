import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Deck, Card, AuthResponse, LoginData, RegisterData } from '../types';

// Configuração base da API - URL do backend
const API_BASE_URL = 'http://localhost:3000';

// Instância do axios com configurações padrão para todas as requisições
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Timeout de 10 segundos para evitar requisições travadas
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor que adiciona automaticamente o token JWT às requisições
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

// Interceptor para tratamento global de erros das respostas
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        // Se receber erro 401 (não autorizado), limpa as credenciais locais
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

// Serviços de Autenticação - Gerencia login, registro e validação de token
export const authAPI = {
    // Registra um novo usuário no sistema
    register: async (data: RegisterData): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/register', data);
        return response.data;
    },

    // Realiza login do usuário e retorna token de autenticação
    login: async (data: LoginData): Promise<AuthResponse> => {
        const response = await api.post('/api/auth/login', data);
        return response.data;
    },

    // Valida se o token atual ainda é válido
    validateToken: async (): Promise<{ valid: boolean }> => {
        const response = await api.get('/api/auth/validate');
        return response.data;
    },
};

// Serviços de Decks - Operações CRUD para gerenciamento de decks
export const deckAPI = {
    // Busca todos os decks do usuário logado
    getDecks: async (): Promise<Deck[]> => {
        const response = await api.get('/api/decks');
        return response.data;
    },

    // Busca um deck específico pelo ID
    getDeckById: async (deckId: number): Promise<Deck> => {
        const response = await api.get(`/api/decks/${deckId}`);
        return response.data;
    },

    // Cria um novo deck para o usuário
    createDeck: async (data: { title: string; description?: string }): Promise<Deck> => {
        const response = await api.post('/api/decks', data);
        return response.data;
    },

    // Atualiza as informações de um deck existente
    updateDeck: async (deckId: number, data: { title: string; description?: string }): Promise<Deck> => {
        const response = await api.put(`/api/decks/${deckId}`, data);
        return response.data;
    },

    // Remove permanentemente um deck e seus cards
    deleteDeck: async (deckId: number): Promise<void> => {
        await api.delete(`/api/decks/${deckId}`);
    },
};

// Serviços de Cards - Operações para gerenciar cards dentro dos decks
export const cardAPI = {
    // Busca todos os cards de um deck específico
    getCards: async (deckId: number): Promise<Card[]> => {
        const response = await api.get(`/api/decks/${deckId}/cards`);
        return response.data;
    },

    // Cria um novo card em um deck
    createCard: async (deckId: number, data: {
        question?: string | null;
        questionImage?: string | null;
        answer: string;
    }): Promise<Card> => {
        const response = await api.post(`/api/decks/${deckId}/cards`, data);
        return response.data;
    },

    // Atualiza as informações de um card existente
    updateCard: async (deckId: number, cardId: number, data: {
        question?: string | null;
        questionImage?: string | null;
        answer: string;
    }): Promise<Card> => {
        const response = await api.put(`/api/decks/${deckId}/cards/${cardId}`, data);
        return response.data;
    },

    // Remove um card específico de um deck
    deleteCard: async (deckId: number, cardId: number): Promise<void> => {
        await api.delete(`/api/decks/${deckId}/cards/${cardId}`);
    },

    // Remove todos os cards de um deck (limpeza completa)
    deleteAllCardsFromDeck: async (deckId: number) => {
        const response = await api.delete(`/api/decks/${deckId}/cards`);
        return response.data;
    },

    // Busca cards para modo de estudo
    getCardsForStudy: async (deckId: number): Promise<Card[]> => {
        const response = await api.get(`/api/decks/${deckId}/study`);
        return response.data;
    },
};

// Utilitários para gerenciamento de tokens e autenticação
export const apiUtils = {
    // Define manualmente o token de autenticação
    setAuthToken: async (token: string) => {
        await AsyncStorage.setItem('userToken', token);
    },

    // Remove todas as credenciais de autenticação
    removeAuthToken: async () => {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('user');
    },

    // Verifica se existe um token de autenticação salvo
    hasAuthToken: async (): Promise<boolean> => {
        const token = await AsyncStorage.getItem('userToken');
        return !!token;
    },

    // Recupera o token de autenticação atual
    getAuthToken: async (): Promise<string | null> => {
        return await AsyncStorage.getItem('userToken');
    },
};

// Exporta a instância do axios para uso direto quando necessário
export default api;