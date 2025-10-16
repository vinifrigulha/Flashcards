import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

// Componente reutilizável para exibir durante operações assíncronas
// Usado durante login, carregamento de dados e verificações de autenticação
export const LoadingScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Indicador de atividade padrão do React Native */}
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Carregando...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#666',
    },
});