import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginData, RegisterData, AuthResponse } from '../types';
import { authAPI } from '../services/api';

interface AuthContextData {
    user: User | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: (navigation?: any) => Promise<void>;
    isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(false);
        setIsAuthenticated(false);
        setUser(null);
    }, []);

    const login = async (data: LoginData): Promise<void> => {
        setLoading(true);
        try {
            const authResponse: AuthResponse = await authAPI.login(data);
            const { token, user: userData } = authResponse;

            if (!token || !userData) {
                throw new Error('Resposta da API inválida');
            }

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('user', JSON.stringify(userData));

            setUser(userData);
            setIsAuthenticated(true);
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || error.message || 'Erro ao fazer login';
            console.error('❌ Erro no login:', errorMessage);
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const register = async (data: RegisterData): Promise<void> => {
        try {
            await authAPI.register(data);
        } catch (error: any) {
            throw error;
        }
    };

    const logout = async (): Promise<void> => {
        try {
            // Limpar AsyncStorage
            await AsyncStorage.multiRemove(['userToken', 'user']);

            // Atualizar estado APENAS
            setUser(null);
            setIsAuthenticated(false);

            // A navegação deve ser feita apenas nos componentes
        } catch (error) {
            console.error('❌ Erro ao fazer logout:', error);
            throw error;
        }
    };

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