import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginData, RegisterData, AuthResponse } from '../types';
import { authAPI } from '../services/api';

// Define a estrutura dos dados que estarão disponíveis no contexto
interface AuthContextData {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: (navigation?: any) => Promise<void>;
    isAuthenticated: boolean;
}

// Cria o contexto de autenticação com valores padrão
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para acessar o contexto de forma simplificada
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

// Provedor principal que gerencia o estado global de autenticação
// Controla login, logout, registro e persistência de sessão
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Inicializa o estado de autenticação ao carregar o app
    useEffect(() => {
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    // Processa o login do usuário e armazena tokens localmente
    const login = async (data: LoginData): Promise<void> => {
        setLoading(true);
        try {
            const authResponse: AuthResponse = await authAPI.login(data);
            const { token, user: userData } = authResponse;

            if (!token || !userData) {
                throw new Error('Resposta da API inválida');
            }

            // Persiste token e dados do usuário no armazenamento local
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Erro ao fazer login';
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    // Registra novo usuário no sistema
    const register = async (data: RegisterData): Promise<void> => {
        try {
            await authAPI.register(data);
        } catch (error: any) {
            throw error;
        }
    };

    // Remove credenciais e finaliza sessão do usuário
    const logout = async (): Promise<void> => {
        try {
            // Limpa todos os dados de autenticação do armazenamento
            await AsyncStorage.multiRemove(['userToken', 'user']);
            setUser(null);
            setIsAuthenticated(false);
        } catch (error) {
            throw error;
        }
    };

    // Valor do contexto disponível para todos os componentes filhos
    const value: AuthContextData = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};