// src/screens/share/UseShareCodeScreen/index.tsx
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deckShareApi } from '../../../services/deckShareApi';
import { DeckPreview, Deck, RootStackParamList } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import styles from './styles';

// Importações compatíveis com Expo
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

type UseShareCodeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'UseShareCode'>;

export const UseShareCodeScreen: React.FC = () => {
    const [shareCode, setShareCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [previewData, setPreviewData] = useState<DeckPreview | null>(null);
    const [usingCode, setUsingCode] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [scanning, setScanning] = useState(false);

    // Gerenciamento de permissões da câmera
    const [permission, requestPermission] = useCameraPermissions();

    const navigation = useNavigation<UseShareCodeScreenNavigationProp>();
    const { user } = useAuth();

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Usar Código',
            headerBackTitle: 'Voltar'
        });
    }, [navigation]);

    const handlePreview = async () => {
        if (!shareCode.trim()) {
            Alert.alert('Erro', 'Digite um código de compartilhamento');
            return;
        }

        try {
            setLoading(true);
            const response = await deckShareApi.getDeckPreview(shareCode.trim().toUpperCase());
            setPreviewData(response.data);
        } catch (error: any) {
            Alert.alert('Erro', error.response?.data?.error || 'Código inválido ou expirado');
            setPreviewData(null);
        } finally {
            setLoading(false);
        }
    };

    const handleUseCode = async () => {
        if (!previewData) return;

        try {
            setUsingCode(true);
            const response = await deckShareApi.useShareCode(shareCode.trim().toUpperCase());
            const newDeck: Deck = response.data.deck;

            if (!newDeck) {
                console.error('❌ Deck não veio na resposta');
                throw new Error('Deck não retornado na resposta da API');
            }

            navigation.replace('DeckCards', {
                deck: newDeck
            });

            setShareCode('');
            setPreviewData(null);

        } catch (error: any) {
            console.error('❌ Erro detalhado ao usar código:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Não foi possível usar o código';
            Alert.alert('Erro', errorMessage);
        } finally {
            setUsingCode(false);
        }
    };

    const clearPreview = () => {
        setPreviewData(null);
        setShareCode('');
    };

    // Função para abrir o scanner
    const openScanner = async () => {
        if (!permission) {
            // Ainda carregando permissões
            return;
        }

        if (!permission.granted) {
            const permissionResult = await requestPermission();
            if (!permissionResult.granted) {
                Alert.alert('Permissão Negada', 'Não é possível acessar a câmera sem permissão.');
                return;
            }
        }

        setShowScanner(true);
        setScanning(true);
    };

    // Função para fechar o scanner
    const closeScanner = () => {
        setShowScanner(false);
        setScanning(false);
    };

    // Função chamada quando um QR Code é detectado
    const onQRCodeScanned = ({ data }: { data: string }) => {
        if (!scanning) return;

        const qrCode = data?.trim().toUpperCase();

        if (qrCode && qrCode.length === 6) {
            setScanning(false);
            setShareCode(qrCode);
            setShowScanner(false);

            // Mostra feedback visual
            Alert.alert(
                'QR Code Lido!',
                `Código: ${qrCode}\n\nClique em "Visualizar" para continuar.`,
                [{ text: 'OK', onPress: () => handlePreview() }]
            );
        } else {
            Alert.alert(
                'QR Code Inválido',
                'O QR Code escaneado não contém um código de compartilhamento válido (6 caracteres).',
                [{ text: 'Tentar Novamente', onPress: () => setScanning(true) }]
            );
        }
    };

    const isCodeExpired = previewData && previewData.expiresAt
        ? new Date(previewData.expiresAt) < new Date()
        : false;

    const isMaxUsesReached = previewData && previewData.maxUses
        ? previewData.useCount >= previewData.maxUses
        : false;

    const isOwnDeck = previewData && user && previewData.author === user.name;

    const canUseCode = previewData && !isCodeExpired && !isMaxUsesReached && !isOwnDeck;

    // Tela do Scanner
    if (showScanner) {
        return (
            <View style={styles.scannerContainer}>
                <CameraView
                    style={styles.camera}
                    facing="back"
                    onBarcodeScanned={scanning ? onQRCodeScanned : undefined}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr'],
                    }}
                >
                    <View style={styles.scannerOverlay}>
                        <View style={styles.scannerFrame}>
                            <View style={styles.cornerTopLeft} />
                            <View style={styles.cornerTopRight} />
                            <View style={styles.cornerBottomLeft} />
                            <View style={styles.cornerBottomRight} />
                        </View>
                        <Text style={styles.scannerText}>Posicione o QR Code dentro do quadro</Text>
                    </View>
                </CameraView>

                <TouchableOpacity style={styles.closeScannerButton} onPress={closeScanner}>
                    <Icon name="close" size={30} color="#FFF" />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Input Section */}
            <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>Digite o código de compartilhamento</Text>

                <View style={styles.codeInputContainer}>
                    <TextInput
                        style={styles.codeInput}
                        placeholder="Ex: A1B2C3"
                        placeholderTextColor="#999"
                        value={shareCode}
                        onChangeText={setShareCode}
                        autoCapitalize="characters"
                        maxLength={6}
                        editable={!loading}
                    />
                    <TouchableOpacity
                        style={[styles.previewButton, (!shareCode.trim() || loading) && styles.buttonDisabled]}
                        onPress={handlePreview}
                        disabled={!shareCode.trim() || loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="#FFF" />
                        ) : (
                            <Text style={styles.previewButtonText}>Visualizar</Text>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Botão do Scanner */}
                <TouchableOpacity
                    style={styles.scannerButton}
                    onPress={openScanner}
                    disabled={!permission}
                >
                    <Icon name="qr-code-scanner" size={24} color="#FFF" />
                    <Text style={styles.scannerButtonText}>Ler QR Code</Text>
                </TouchableOpacity>

                {permission && !permission.granted && (
                    <Text style={styles.errorText}>
                        Permissão da câmera necessária para escanear QR Codes
                    </Text>
                )}
            </View>

            {/* Preview Section */}
            {previewData && (
                <View style={styles.previewSection}>
                    <Text style={styles.sectionTitle}>Pré-visualização do Deck</Text>

                    <View style={[
                        styles.previewCard,
                        !canUseCode && styles.previewCardDisabled
                    ]}>
                        <Text style={styles.previewTitle}>{previewData.title}</Text>

                        {previewData.description && (
                            <Text style={styles.previewDescription}>{previewData.description}</Text>
                        )}

                        <View style={styles.previewDetails}>
                            <Text style={styles.previewDetail}>
                                <Icon name="person" size={14} color="#666" /> Por: {previewData.author}
                            </Text>
                            <Text style={styles.previewDetail}>
                                <Icon name="content-copy" size={14} color="#666" /> {previewData.cardCount} cards
                            </Text>
                            <Text style={styles.previewDetail}>
                                <Icon name="schedule" size={14} color="#666" />
                                {previewData.expiresAt
                                    ? ` Expira: ${new Date(previewData.expiresAt).toLocaleDateString('pt-BR')}`
                                    : ' Sem expiração'
                                }
                            </Text>
                            <Text style={styles.previewDetail}>
                                <Icon name="link" size={14} color="#666" />
                                {previewData.maxUses
                                    ? ` ${previewData.useCount}/${previewData.maxUses} usos`
                                    : ` ${previewData.useCount} usos`
                                }
                            </Text>
                        </View>

                        {/* Status Messages */}
                        {isCodeExpired && (
                            <Text style={styles.errorText}>❌ Este código expirou</Text>
                        )}

                        {isMaxUsesReached && (
                            <Text style={styles.errorText}>❌ Limite de usos atingido</Text>
                        )}

                        {isOwnDeck && (
                            <Text style={styles.errorText}>❌ Você não pode usar seu próprio código</Text>
                        )}

                        {canUseCode && (
                            <Text style={styles.successText}>✅ Código válido</Text>
                        )}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.cancelButton]}
                            onPress={clearPreview}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                styles.useButton,
                                (!canUseCode || usingCode) && styles.buttonDisabled
                            ]}
                            onPress={handleUseCode}
                            disabled={!canUseCode || usingCode}
                        >
                            {usingCode ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.useButtonText}>Adicionar à Minha Coleção</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            {/* Instructions */}
            <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Como funciona?</Text>
                <Text style={styles.instruction}>1. Use um código de compartilhamento de 6 caracteres</Text>
                <Text style={styles.instruction}>2. Visualize as informações do deck</Text>
                <Text style={styles.instruction}>3. Adicione o deck à sua coleção</Text>
                <Text style={styles.instruction}>• Você receberá uma cópia do deck</Text>
                <Text style={styles.instruction}>• <Text style={{ fontWeight: 'bold' }}>Não é possível usar seu próprio código</Text></Text>
                <Text style={[styles.instruction, { marginTop: 10, fontStyle: 'italic' }]}>
                    💡 Dica: Use o botão "Ler QR Code" para escanear códigos rapidamente!
                </Text>
            </View>
        </ScrollView>
    );
};