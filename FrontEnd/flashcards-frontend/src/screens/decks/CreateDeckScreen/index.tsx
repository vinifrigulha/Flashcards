import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deckAPI } from '../../../services/api';
import { CreateDeckScreenNavigationProp } from '../../../types/navigation';
import styles from './styles';
import Toast from 'react-native-toast-message';

export const CreateDeckScreen: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<CreateDeckScreenNavigationProp>();

    // Submissão do formulário de criação de deck
    const handleSubmit = async () => {
        if (!formData.title.trim()) {
            Alert.alert('Erro', 'O título do deck é obrigatório');
            return;
        }

        setLoading(true);
        try {
            // Verificar decks existentes para evitar duplicatas
            const existingDecks = await deckAPI.getDecks();

            const isDuplicate = existingDecks.some((deck: any) => {
                return deck.title.trim().toLowerCase() === formData.title.trim().toLowerCase();
            });

            if (isDuplicate) {
                Toast.show({
                    type: 'error',
                    text1: 'Deck já existe',
                    text2: 'Já existe um deck com este título.',
                    position: 'top',
                    visibilityTime: 3000,
                    topOffset: 60,
                });
                setLoading(false);
                return;
            }

            // Criar novo deck
            const newDeck = await deckAPI.createDeck({
                title: formData.title.trim(),
                description: formData.description.trim() || undefined,
            });

            // Navegar para o deck recém-criado
            navigation.reset({
                index: 1,
                routes: [
                    { name: 'Decks' },
                    { name: 'DeckCards', params: { deck: newDeck } }
                ],
            });
        } catch (error: any) {
            Toast.show({
                type: 'error',
                text1: 'Erro ao criar deck',
                text2: error.response?.data?.error || 'Tente novamente',
                position: 'top',
                visibilityTime: 4000,
                topOffset: 60,
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
            <Text style={styles.title}>Criar Novo Deck</Text>
            <Text style={styles.subtitle}>
                Organize seus flashcards em decks temáticos
            </Text>

            {/* Formulário de criação */}
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Título *</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Anatomia Humana, Vocabulário Inglês..."
                        placeholderTextColor="#999"
                        value={formData.title}
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                        maxLength={100}
                        editable={!loading}
                    />
                    <Text style={styles.charCount}>
                        {formData.title.length}/100 caracteres
                    </Text>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Descrição (opcional)</Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Descreva o conteúdo deste deck..."
                        placeholderTextColor="#999"
                        value={formData.description}
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                        multiline
                        numberOfLines={4}
                        maxLength={500}
                        editable={!loading}
                        textAlignVertical="top"
                    />
                    <Text style={styles.charCount}>
                        {formData.description.length}/500 caracteres
                    </Text>
                </View>
            </View>

            {/* Botões de ação */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.cancelButton]}
                    onPress={handleCancel}
                    disabled={loading}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>Criar Deck</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};