import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Modal,
    Share,
    Clipboard,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCode from 'react-native-qrcode-svg';
import Toast from 'react-native-toast-message';
import { deckShareApi } from '../../../services/deckShareApi';
import { Deck, DeckShare } from '../../../types';
import styles from './styles';

type RouteParams = {
    deck: Deck;
};

export const ShareDeckScreen: React.FC = () => {
    const [shareCodes, setShareCodes] = useState<DeckShare[]>([]);
    const [loading, setLoading] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [revoking, setRevoking] = useState<string | null>(null);
    const [qrModalVisible, setQrModalVisible] = useState(false);
    const [selectedShareCode, setSelectedShareCode] = useState<string | null>(null);
    const [showCopiedMessage, setShowCopiedMessage] = useState(false);

    const route = useRoute();
    const navigation = useNavigation();
    const { deck } = route.params as RouteParams;

    const hasActiveCodes = shareCodes.length > 0;

    React.useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Compartilhar Deck',
            headerBackTitle: 'Voltar'
        });
    }, [navigation]);

    useEffect(() => {
        loadShareCodes();
    }, []);

    const copyToClipboard = async (shareCodeString: string) => {
        try {
            await Clipboard.setString(shareCodeString);

            // ✅ Toast de sucesso personalizado
            Toast.show({
                type: 'success',
                text1: 'Código Copiado!',
                text2: `Código ${shareCodeString} copiado para a área de transferência`,
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível copiar o código');
        }
    };

    const copyToClipboardFromModal = async () => {
        if (!selectedShareCode) return;

        try {
            await Clipboard.setString(selectedShareCode);
            setShowCopiedMessage(true);

            // ✅ Toast também no modal
            Toast.show({
                type: 'success',
                text1: 'Código Copiado!',
                text2: `Código ${selectedShareCode} copiado para a área de transferência`,
                position: 'top',
                visibilityTime: 3000,
                autoHide: true,
                topOffset: 50,
            });

            setTimeout(() => {
                setShowCopiedMessage(false);
            }, 2000);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível copiar o código');
        }
    };

    const loadShareCodes = async () => {
        try {
            setLoading(true);
            const response = await deckShareApi.getMyShareCodes();
            const deckShareCodes = Array.isArray(response.data)
                ? response.data.filter((code: DeckShare) =>
                    code.deckId === deck.id && code.isActive
                )
                : [];
            setShareCodes(deckShareCodes);
        } catch (error) {
            console.error('Erro ao carregar códigos:', error);
            Alert.alert('Erro', 'Não foi possível carregar os códigos de compartilhamento');
        } finally {
            setLoading(false);
        }
    };

    const generateShareCode = async () => {
        if (shareCodes.length > 0) {
            Toast.show({
                type: 'info',
                text1: 'Código Ativo',
                text2: 'Revogue o código existente antes de gerar um novo.',
                position: 'top',
                visibilityTime: 3000,
            });
            return;
        }

        try {
            setGenerating(true);
            const response = await deckShareApi.generateShareCode(deck.id, 7, undefined);

            if (response.data) {

                const newShareCode: DeckShare = {
                    id: response.data.id || Date.now(),
                    shareCode: response.data.shareCode,
                    deckId: deck.id,
                    deck: {
                        title: response.data.deck?.title || deck.title,
                        description: response.data.deck?.description || deck.description || null,
                        isPublic: false
                    },
                    expiresAt: response.data.expiresAt || null,
                    maxUses: response.data.maxUses || null,
                    useCount: 0,
                    isActive: true,
                    createdAt: new Date().toISOString()
                };

                if (!newShareCode.shareCode) {
                    console.warn('Resposta da API incompleta:', response.data);
                    throw new Error('Resposta da API incompleta - falta shareCode');
                }

                setShareCodes(prev => [newShareCode, ...prev]);
            } else {
                throw new Error('Resposta da API vazia');
            }
        } catch (error: any) {
            console.error('Erro ao gerar código:', error);
            Toast.show({
                type: 'error',
                text1: 'Erro',
                text2: error.response?.data?.error || error.message || 'Não foi possível gerar o código',
                position: 'top',
                visibilityTime: 3000,
            });
        } finally {
            setGenerating(false);
        }
    };

    const revokeShareCode = async (shareId: number) => {
        try {
            setRevoking(shareId.toString());

            const isTemporaryId = shareId > 1000000000;

            if (!isTemporaryId) {
                await deckShareApi.revokeShareCode(shareId);
            }

            setShareCodes(prev => prev.filter(code => code.id !== shareId));

            // ✅ Toast de sucesso para revogação
            Toast.show({
                type: 'success',
                text1: 'Código Revogado',
                text2: 'O código de compartilhamento foi revogado com sucesso',
                position: 'top',
                visibilityTime: 3000,
            });
        } catch (error: any) {
            console.error('Erro ao revogar código:', error);

            const isTemporaryId = shareId > 1000000000;
            if (isTemporaryId) {
                setShareCodes(prev => prev.filter(code => code.id !== shareId));
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: error.response?.data?.error || 'Não foi possível revogar o código',
                    position: 'top',
                    visibilityTime: 3000,
                });
            }
        } finally {
            setRevoking(null);
        }
    };

    const shareCode = (shareCodeString: string) => {
        const shareUrl = `flashcards://deck-share/${shareCodeString}`;
        const message = `Estou compartilhando o deck "${deck.title}" com você!\n\nUse o código: ${shareCodeString}\n\nOu escaneie o QR Code no app.`;

        Share.share({
            message: message,
            title: `Compartilhar Deck: ${deck.title}`,
        });
    };

    const showQRCode = (shareCodeString: string) => {
        setSelectedShareCode(shareCodeString);
        setQrModalVisible(true);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Sem expiração';
        try {
            return new Date(dateString).toLocaleDateString('pt-BR');
        } catch {
            return 'Data inválida';
        }
    };

    const getUsesText = (useCount: number, maxUses: number | null) => {
        if (maxUses === null) return `${useCount} usos`;
        return `${useCount}/${maxUses} usos`;
    };

    const isExpired = (expiresAt: string | null) => {
        if (!expiresAt) return false;
        try {
            return new Date(expiresAt) < new Date();
        } catch {
            return false;
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Modal do QR Code */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={qrModalVisible}
                onRequestClose={() => setQrModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>QR Code do Deck</Text>

                        {selectedShareCode && (
                            <View style={styles.qrContainer}>
                                <QRCode
                                    value={selectedShareCode}
                                    size={200}
                                    backgroundColor="white"
                                    color="black"
                                />

                                {/* ✅ Mensagem de código copiado */}
                                <View style={styles.messageContainer}>
                                    {showCopiedMessage && (
                                        <View style={styles.copiedMessage}>
                                            <Icon name="check-circle" size={16} color="#4CAF50" />
                                            <Text style={styles.copiedMessageText}>Código copiado com sucesso!</Text>
                                        </View>
                                    )}
                                </View>

                                <Text style={styles.shareCodeText}>{selectedShareCode}</Text>
                            </View>
                        )}

                        <View style={styles.modalButtons}>
                            {/* ✅ Botão de Copiar */}
                            <TouchableOpacity
                                style={[styles.modalButton, styles.copyButton]}
                                onPress={copyToClipboardFromModal}
                            >
                                <Icon name="content-copy" size={20} color="#FFF" />
                                <Text style={styles.copyButtonText}>Copiar Código</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.closeButton]}
                                onPress={() => {
                                    setQrModalVisible(false);
                                    setShowCopiedMessage(false);
                                }}
                            >
                                <Text style={styles.closeButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Deck Info */}
            <View style={styles.deckInfo}>
                <Text style={styles.deckTitle}>{deck.title}</Text>
                {deck.description && (
                    <Text style={styles.deckDescription}>{deck.description}</Text>
                )}
                <Text style={styles.cardsCount}>
                    {deck.cards?.length || 0} cards
                </Text>
            </View>

            {/* Generate Button */}
            <TouchableOpacity
                style={[
                    styles.generateButton,
                    (generating || hasActiveCodes) && styles.buttonDisabled
                ]}
                onPress={generateShareCode}
                disabled={generating || hasActiveCodes}
            >
                {generating ? (
                    <ActivityIndicator color="#FFF" />
                ) : (
                    <>
                        <Icon name="link" size={20} color="#FFF" />
                        <Text style={styles.generateButtonText}>
                            {hasActiveCodes ? 'Código Ativo Existe' : 'Gerar Código de Compartilhamento'}
                        </Text>
                    </>
                )}
            </TouchableOpacity>

            {/* Share Codes List */}
            <ScrollView style={styles.codesList}>
                {shareCodes.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Icon name="share" size={64} color="#CCC" />
                        <Text style={styles.emptyTitle}>Nenhum código gerado</Text>
                        <Text style={styles.emptyDescription}>
                            Gere um código para compartilhar este deck com outros usuários
                        </Text>
                    </View>
                ) : (
                    shareCodes.map((code) => (
                        <View key={code.id} style={styles.codeItem}>
                            <View style={styles.codeInfo}>
                                <Text style={styles.codeValue}>{code.shareCode}</Text>
                                <View style={styles.codeDetails}>
                                    <Text style={styles.codeDetail}>
                                        Expira: {formatDate(code.expiresAt)}
                                        {isExpired(code.expiresAt) && (
                                            <Text style={styles.expiredText}> (Expirado)</Text>
                                        )}
                                    </Text>
                                    <Text style={styles.codeDetail}>
                                        {getUsesText(code.useCount, code.maxUses)}
                                    </Text>
                                    <Text style={styles.codeDetail}>
                                        Criado em: {formatDate(code.createdAt)}
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.codeActions}>
                                {/* ✅ BOTÃO COPIAR ADICIONADO PRIMEIRO */}
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => copyToClipboard(code.shareCode)}
                                >
                                    <Icon name="content-copy" size={20} color="#007AFF" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => showQRCode(code.shareCode)}
                                >
                                    <Icon name="qr-code" size={20} color="#007AFF" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => shareCode(code.shareCode)}
                                >
                                    <Icon name="share" size={20} color="#007AFF" />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.actionButton, revoking === code.id.toString() && styles.buttonDisabled]}
                                    onPress={() => revokeShareCode(code.id)}
                                    disabled={revoking === code.id.toString()}
                                >
                                    {revoking === code.id.toString() ? (
                                        <ActivityIndicator size="small" color="#FF3B30" />
                                    ) : (
                                        <Icon name="link-off" size={20} color="#FF3B30" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            {/* ✅ Componente Toast */}
            <Toast />
        </View>
    );
};