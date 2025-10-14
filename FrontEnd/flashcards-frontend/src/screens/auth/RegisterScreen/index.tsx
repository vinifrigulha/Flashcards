import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';

LogBox.ignoreLogs([
    'shadow',
    'pointerEvents',
    'Cannot record touch end without a touch start'
]);

export const RegisterScreen: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { register } = useAuth();
    const navigation = useNavigation();

    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [touched, setTouched] = useState({
        password: false,
        confirmPassword: false
    });

    const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
    const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    const validatePassword = (password: string) => {
        const errors = [];

        if (password.length < 8) {
            errors.push('Mínimo 8 caracteres');
        }
        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Pelo menos uma letra minúscula');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Pelo menos uma letra maiúscula');
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Pelo menos um número');
        }
        if (!/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)) {
            errors.push('Pelo menos um caractere especial');
        }

        return errors;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        // SEMPRE valida a senha quando o usuário digita
        const errors = validatePassword(text);
        setPasswordErrors(errors);
        setShowPasswordRequirements(text.length > 0);
    };

    // Valida a confirmação sempre que a senha mudar
    useEffect(() => {
        if (confirmPassword) {
            setConfirmPasswordError(confirmPassword !== password ? 'As senhas não coincidem' : '');
        }
    }, [password, confirmPassword]);

    const handleConfirmPasswordChange = (text: string) => {
        setConfirmPassword(text);
    };

    const handleBlur = (field: 'password' | 'confirmPassword') => {
        setTouched(prev => ({ ...prev, [field]: true }));
    };

    const handlePasswordFocus = () => {
        setShowPasswordRequirements(true);
    };

    const handleSubmit = async () => {
        setTouched({ password: true, confirmPassword: true });

        // Validação da senha
        const passwordValidationErrors = validatePassword(password);
        setPasswordErrors(passwordValidationErrors);

        // Validação de confirmação de senha
        const confirmError = confirmPassword !== password ? 'As senhas não coincidem' : '';
        setConfirmPasswordError(confirmError);

        // ⭐ ORDEM DE PRIORIDADE CORRIGIDA:
        // 1. Primeiro verifica campos obrigatórios
        if (!name || !email || !password || !confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Campos obrigatórios',
                text2: 'Preencha todos os campos para continuar',
                position: 'top',
                visibilityTime: 4000,
            });
            return;
        }

        // 2. Verifica se email é válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Toast.show({
                type: 'error',
                text1: 'E-mail inválido',
                text2: 'Digite um e-mail válido',
                position: 'top',
                visibilityTime: 4000,
            });
            return;
        }

        // 3. ⭐ PRIMEIRO verifica erros da senha (MAIOR PRIORIDADE)
        if (passwordValidationErrors.length > 0) {
            const errorMessage = passwordValidationErrors.length === 1
                ? passwordValidationErrors[0]
                : `Corrija ${passwordValidationErrors.length} erros na senha`;

            Toast.show({
                type: 'error',
                text1: 'Senha inválida',
                text2: errorMessage,
                position: 'top',
                visibilityTime: 5000,
            });
            return;
        }

        // 4. ⭐ DEPOIS verifica confirmação de senha
        if (confirmError) {
            Toast.show({
                type: 'error',
                text1: 'Senhas não coincidem',
                text2: 'As senhas digitadas não são iguais',
                position: 'top',
                visibilityTime: 4000,
            });
            return;
        }

        // Se passou por todas as validações, tenta o registro
        setLoading(true);

        try {
            await register({ name, email, password });
            setShowSuccessModal(true);
        } catch (error: any) {
            const message = error.response?.data?.error || error.message || 'Erro ao criar conta';

            if (message.includes('E-mail já cadastrado')) {
                Toast.show({
                    type: 'error',
                    text1: 'E-mail já cadastrado',
                    text2: 'Este e-mail já está em uso. Tente outro e-mail.',
                    position: 'top',
                    visibilityTime: 5000,
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro no cadastro',
                    text2: message,
                    position: 'top',
                    visibilityTime: 4000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        navigation.navigate('Login' as never);
    };

    const handleLogin = () => {
        navigation.navigate('Login' as never);
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Criar Conta</Text>
                <Text style={styles.subtitle}>Preencha os dados para se cadastrar</Text>

                {/* NOME COMPLETO */}
                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    editable={!loading}
                />

                {/* E-MAIL */}
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

                {/* SENHA */}
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            styles.passwordInput,
                            passwordErrors.length > 0 && styles.inputError,
                        ]}
                        placeholder="Senha"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        onBlur={() => handleBlur('password')}
                        secureTextEntry={!showPassword}
                        editable={!loading}
                        textContentType="newPassword"
                        autoComplete="password-new"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={toggleShowPassword}
                    >
                        <Icon
                            name={showPassword ? "visibility-off" : "visibility"}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* EXIBIÇÃO DOS ERROS - APENAS O QUE ESTÁ FALTANDO */}
                {showPasswordRequirements && passwordErrors.length > 0 && (
                    <View style={styles.passwordErrorsContainer}>
                        {passwordErrors.map((error, index) => (
                            <Text key={index} style={styles.errorText}>• {error}</Text>
                        ))}
                    </View>
                )}

                {/* CONFIRMAR SENHA */}
                <View style={styles.passwordInputContainer}>
                    <TextInput
                        style={[
                            styles.input,
                            styles.passwordInput,
                            confirmPasswordError && styles.inputError, // ⭐ ESTE ESTÁ IMPORTANTE
                        ]}
                        placeholder="Confirmar senha"
                        placeholderTextColor="#999"
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        onBlur={() => handleBlur('confirmPassword')}
                        secureTextEntry={!showConfirmPassword}
                        editable={!loading}
                        textContentType="password"
                        autoComplete="password"
                    />
                    <TouchableOpacity
                        style={styles.eyeIcon}
                        onPress={toggleShowConfirmPassword}
                    >
                        <Icon
                            name={showConfirmPassword ? "visibility-off" : "visibility"}
                            size={24}
                            color="#666"
                        />
                    </TouchableOpacity>
                </View>

                {/* ⭐ EXIBIÇÃO DO ERRO DE CONFIRMAÇÃO */}
                {confirmPasswordError ? (
                    <Text style={styles.errorText}>{confirmPasswordError}</Text>
                ) : null}

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.buttonText}>Criar Conta</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginLink} onPress={handleLogin}>
                    <Text style={styles.loginText}>
                        Já tem uma conta? <Text style={styles.loginTextBold}>Faça login</Text>
                    </Text>
                </TouchableOpacity>
            </ScrollView>

            <Modal
                visible={showSuccessModal}
                transparent={true}
                animationType="fade"
                statusBarTranslucent={true}
                onRequestClose={handleSuccessModalClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>
                            ✅ Sucesso!
                        </Text>
                        <Text style={styles.modalMessage}>
                            Usuário criado com sucesso!
                        </Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={handleSuccessModalClose}
                        >
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
};