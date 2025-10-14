// Utilitários para gerenciamento de storage de forma segura

/**
 * Salva um item no localStorage com tratamento de erro
 */
export const setItem = (key: string, value: any): boolean => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Erro ao salvar ${key} no localStorage:`, error);
        return false;
    }
};

/**
 * Recupera um item do localStorage com tratamento de erro
 */
export const getItem = <T>(key: string, defaultValue?: T): T | null => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            const item = localStorage.getItem(key);
            if (item === null) {
                return defaultValue || null;
            }
            return JSON.parse(item) as T;
        }
        return defaultValue || null;
    } catch (error) {
        console.error(`Erro ao recuperar ${key} do localStorage:`, error);
        return defaultValue || null;
    }
};

/**
 * Remove um item do localStorage
 */
export const removeItem = (key: string): boolean => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    } catch (error) {
        console.error(`Erro ao remover ${key} do localStorage:`, error);
        return false;
    }
};

/**
 * Limpa todo o localStorage
 */
export const clear = (): boolean => {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            localStorage.clear();
            return true;
        }
        return false;
    } catch (error) {
        console.error('Erro ao limpar localStorage:', error);
        return false;
    }
};

// Chaves específicas do aplicativo
export const STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    THEME: 'theme',
    LANGUAGE: 'language',
} as const;