import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

// Componente para capturar e tratar erros inesperados em toda a aplicação
// Evita que falhas em componentes filhos quebrem toda a interface
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
        };
    }

    // Método do React que atualiza o estado quando um erro é capturado
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return {
            hasError: true,
            error,
        };
    }

    // Log do erro para debugging enquanto exibe interface amigável ao usuário
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Error Boundary capturou um erro:', error, errorInfo);
    }

    // Permite ao usuário tentar recuperar a aplicação
    handleRetry = () => {
        this.setState({
            hasError: false,
            error: null,
        });
    };

    render() {
        // Se houve erro, mostra tela de fallback em vez dos componentes filhos
        if (this.state.hasError) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Algo deu errado</Text>
                    <Text style={styles.errorText}>
                        {this.state.error?.message || 'Erro desconhecido'}
                    </Text>
                    <TouchableOpacity style={styles.button} onPress={this.handleRetry}>
                        <Text style={styles.buttonText}>Tentar Novamente</Text>
                    </TouchableOpacity>
                </View>
            );
        }

        // Renderiza componentes filhos normalmente se não há erro
        return this.props.children;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    errorText: {
        fontSize: 16,
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});