import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import styles from './styles';

// Tela de autenticação para usuários existentes
export const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigation = useNavigation();

    // Processa o login do usuário
    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha todos os campos');
            return;
        }

        setLoading(true);
        try {
            await login({ email, password });
        } catch (error: any) {
            Alert.alert('Erro', error.message || 'Erro ao fazer login');
        } finally {
            setLoading(false);
        }
    };

    // Navega para tela de registro
    const handleRegister = () => {
        navigation.navigate('Register' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Flashcards App</Text>
            <Text style={styles.subtitle}>Faça login para continuar</Text>

            {/* Campo de email */}
            <TextInput
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
            />

            {/* Campo de senha */}
            <TextInput
                style={styles.input}
                placeholder="Senha"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
            />

            {/* Botão de login */}
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <Text style={styles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>

            {/* Link para tela de registro */}
            <TouchableOpacity style={styles.registerLink} onPress={handleRegister}>
                <Text style={styles.registerText}>
                    Não tem uma conta? <Text style={styles.registerTextBold}>Cadastre-se</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
};