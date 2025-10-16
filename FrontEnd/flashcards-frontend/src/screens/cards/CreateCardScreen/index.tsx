import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
    Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';
import { cardAPI } from '../../../services/api';
import { CreateCardScreenNavigationProp } from '../../../types/navigation';
import styles from './styles';
import Toast from 'react-native-toast-message';
import { uploadAPI } from '../../../services/uploadAPI';

type RouteParams = {
    deckId: number;
};

// Tela para criação de novos cards de estudo
export const CreateCardScreen: React.FC = () => {
    const [formData, setFormData] = useState({
        question: '',
        questionImage: null as string | null,
        answer: '',
    });
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const navigation = useNavigation<CreateCardScreenNavigationProp>();
    const route = useRoute();
    const { deckId } = route.params as RouteParams;
    const API_BASE_URL = 'http://localhost:3000';

    // Seleciona imagem da galeria e faz upload
    const pickImage = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permissionResult.granted) {
                Alert.alert('Permissão necessária', 'Precisamos de acesso à sua galeria para adicionar imagens.');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ['images'],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0].uri) {
                setUploadingImage(true);
                try {
                    const uploadResponse = await uploadAPI.uploadImage(result.assets[0].uri);
                    const fullImageUrl = `${API_BASE_URL}${uploadResponse.imageUrl}`;

                    setFormData({
                        ...formData,
                        questionImage: fullImageUrl
                    });
                } catch (uploadError) {
                    Alert.alert('Erro', 'Não foi possível fazer upload da imagem');
                } finally {
                    setUploadingImage(false);
                }
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível selecionar a imagem');
            setUploadingImage(false);
        }
    };

    const removeImage = () => {
        setFormData({
            ...formData,
            questionImage: null
        });
    };

    // Valida e cria novo card no deck
    const handleSubmit = async () => {
        if (!formData.question?.trim() && !formData.questionImage) {
            Alert.alert('Erro', 'A pergunta deve conter texto ou imagem');
            return;
        }

        if (!formData.answer.trim()) {
            Alert.alert('Erro', 'A resposta é obrigatória');
            return;
        }

        setLoading(true);
        try {
            const existingCards = await cardAPI.getCards(deckId);

            // Verifica se já existe card idêntico
            const isDuplicate = existingCards.some((card: any) => {
                const sameQuestion = card.question?.trim().toLowerCase() === formData.question?.trim().toLowerCase();
                const sameAnswer = card.answer.trim().toLowerCase() === formData.answer.trim().toLowerCase();
                return sameQuestion && sameAnswer;
            });

            if (isDuplicate) {
                Toast.show({
                    type: 'error',
                    text1: 'Card já existe',
                    text2: 'Este card já está no seu deck.',
                    position: 'top',
                    visibilityTime: 3000,
                });
                setLoading(false);
                return;
            }

            const cardData = {
                question: formData.question?.trim() || null,
                questionImage: formData.questionImage,
                answer: formData.answer.trim(),
            };

            await cardAPI.createCard(deckId, cardData);
            navigation.goBack();

        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao criar card',
                text2: error.response?.data?.error || 'Tente novamente',
                position: 'top',
                visibilityTime: 4000,
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigation.goBack();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Novo Card</Text>
            <Text style={styles.subtitle}>
                Crie um novo card de flashcard
            </Text>

            <View style={styles.form}>
                {/* Seção da pergunta com opção de imagem */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Pergunta *</Text>
                    <Text style={styles.hint}>
                        (texto, imagem ou ambos)
                    </Text>

                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Digite a pergunta (opcional se adicionar imagem)..."
                        placeholderTextColor="#999"
                        value={formData.question}
                        onChangeText={(text) => setFormData({ ...formData, question: text })}
                        multiline
                        numberOfLines={3}
                        maxLength={500}
                        editable={!loading && !uploadingImage}
                        textAlignVertical="top"
                    />
                    <Text style={styles.charCount}>
                        {formData.question?.length || 0}/500 caracteres
                    </Text>

                    {/* Upload de imagem */}
                    <View style={styles.imageSection}>
                        {formData.questionImage ? (
                            <View style={styles.imagePreviewContainer}>
                                <Image
                                    source={{ uri: formData.questionImage }}
                                    style={styles.imagePreview}
                                />
                                <TouchableOpacity
                                    style={styles.removeImageButton}
                                    onPress={removeImage}
                                    disabled={loading}
                                >
                                    <Text style={styles.removeImageText}>×</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                style={[styles.addImageButton, uploadingImage && styles.buttonDisabled]}
                                onPress={pickImage}
                                disabled={uploadingImage || loading}
                            >
                                {uploadingImage ? (
                                    <ActivityIndicator color="#007AFF" />
                                ) : (
                                    <>
                                        <Text style={styles.addImageIcon}>📷</Text>
                                        <Text style={styles.addImageText}>
                                            Adicionar Imagem
                                        </Text>
                                    </>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Campo da resposta */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Resposta *</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Digite a resposta..."
                        placeholderTextColor="#999"
                        value={formData.answer}
                        onChangeText={(text) => setFormData({ ...formData, answer: text })}
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        editable={!loading && !uploadingImage}
                        textAlignVertical="top"
                    />
                    <Text style={styles.charCount}>
                        {formData.answer.length}/500 caracteres
                    </Text>
                </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                    disabled={loading || uploadingImage}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.submitButton, (loading || uploadingImage) && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading || uploadingImage}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Criar Card</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};