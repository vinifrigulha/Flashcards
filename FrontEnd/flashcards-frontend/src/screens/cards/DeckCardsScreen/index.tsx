import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert,
    ActivityIndicator,
    Modal,
    TextInput,
    Image,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { Card, Deck } from '../../../types';
import { cardAPI, deckAPI } from '../../../services/api';
import { uploadAPI } from '../../../services/uploadAPI';
import { DeckCardsScreenNavigationProp } from '../../../types/navigation';
import styles from './styles';

type RouteParams = {
    deck: Deck;
    onDeckUpdated?: (updatedDeck: Deck) => void;
};

export const DeckCardsScreen: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [filteredCards, setFilteredCards] = useState<Card[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [studyModalVisible, setStudyModalVisible] = useState(false);
    const [editDeckModalVisible, setEditDeckModalVisible] = useState(false);
    const [editCardModalVisible, setEditCardModalVisible] = useState(false);
    const [deleteCardModalVisible, setDeleteCardModalVisible] = useState(false);
    const [studyCardCount, setStudyCardCount] = useState('1');
    const [editDeckData, setEditDeckData] = useState({ title: '', description: '' });
    const [editCardData, setEditCardData] = useState({
        id: 0,
        question: '',
        questionImage: null as string | null,
        answer: ''
    });
    const API_BASE_URL = 'http://localhost:3000';
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
    const [showAllAnswers, setShowAllAnswers] = useState(false);

    const navigation = useNavigation<DeckCardsScreenNavigationProp>();
    const route = useRoute();
    const { deck, onDeckUpdated } = route.params as RouteParams;

    // Verificar se é um deck compartilhado (cópia)
    const isSharedDeck = currentDeck ? currentDeck.title.startsWith('Cópia - ') : false;

    // Inicializa o currentDeck imediatamente
    useEffect(() => {
        setCurrentDeck(deck);
        navigation.setOptions({
            title: deck.title
        });

        // Carrega os cards imediatamente
        loadCards(deck.id);
    }, [deck, navigation]);

    // Filtra cards baseado na busca
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredCards(cards);
        } else {
            const query = searchQuery.toLowerCase().trim();
            const filtered = cards.filter(card =>
                (card.question && card.question.toLowerCase().includes(query)) ||
                card.answer.toLowerCase().includes(query)
            );
            setFilteredCards(filtered);
        }
    }, [searchQuery, cards]);

    // Função loadCards recebe deckId como parâmetro
    const loadCards = async (deckId: number) => {
        try {
            const cardsData = await cardAPI.getCards(deckId);

            setCards(cardsData);
            setFilteredCards(cardsData);
        } catch (error: any) {
            Alert.alert('Erro', 'Não foi possível carregar os cards');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // useFocusEffect simplificado
    useFocusEffect(
        React.useCallback(() => {
            if (currentDeck) {
                loadCards(currentDeck.id);
            }
        }, [currentDeck])
    );

    const handleRefresh = () => {
        setRefreshing(true);
        if (currentDeck) {
            loadCards(currentDeck.id);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Compartilhar deck
    const handleShareDeck = () => {
        if (!currentDeck) return;
        navigation.navigate('ShareDeck', { deck: currentDeck });
    };

    // Removido bloqueio para decks compartilhados
    const handleDeleteCard = (cardId: number) => {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;

        setSelectedCard(card);
        setDeleteCardModalVisible(true);
    };

    const confirmDeleteCard = async () => {
        if (!selectedCard || !currentDeck) return;

        try {
            await cardAPI.deleteCard(currentDeck.id, selectedCard.id);
            setCards(prev => prev.filter(card => card.id !== selectedCard.id));
            Alert.alert('Sucesso', 'Card excluído com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível excluir o card');
        } finally {
            setDeleteCardModalVisible(false);
            setSelectedCard(null);
        }
    };

    const handleCreateCard = () => {
        if (!currentDeck) return;
        navigation.navigate('CreateCard', { deckId: currentDeck.id });
    };

    const handleStudyDeck = () => {
        if (cards.length === 0) {
            Alert.alert('Aviso', 'Adicione cards ao deck antes de estudar');
            return;
        }
        setStudyModalVisible(true);
    };

    const startStudySession = () => {
        if (!currentDeck) return;

        let cardsToStudy = cards.length;

        if (studyCardCount && studyCardCount !== '') {
            const requestedCount = parseInt(studyCardCount);
            if (requestedCount > 0 && requestedCount <= cards.length) {
                cardsToStudy = requestedCount;
            } else {
                Alert.alert('Erro', `Digite um número entre 1 e ${cards.length}`);
                return;
            }
        }

        const shuffledCards = [...cards]
            .sort(() => Math.random() - 0.5)
            .slice(0, cardsToStudy);

        setStudyModalVisible(false);

        navigation.navigate('StudyDeck', {
            deck: { ...currentDeck, cards: cards },
            cards: shuffledCards
        });
    };

    const startStudyAllSession = () => {
        if (!currentDeck) return;

        const shuffledCards = [...cards].sort(() => Math.random() - 0.5);

        setStudyModalVisible(false);

        navigation.navigate('StudyDeck', {
            deck: { ...currentDeck, cards: cards },
            cards: shuffledCards
        });
    };

    const handleEditDeck = () => {
        if (!currentDeck) return;

        setEditDeckData({
            title: currentDeck.title,
            description: currentDeck.description || ''
        });
        setEditDeckModalVisible(true);
    };

    // Lógica para permitir nomes iguais entre próprios e compartilhados
    const updateDeck = async () => {
        if (!currentDeck || !editDeckData.title.trim()) {
            Toast.show({
                type: 'error',
                text1: 'Erro',
                position: 'top',
                text2: 'O título do deck é obrigatório'
            });
            return;
        }

        // Verifica se o nome foi alterado
        if (editDeckData.title.trim() === currentDeck.title) {
            // Se o nome não mudou, permite a atualização normalmente
            try {
                const description = editDeckData.description.trim();
                const descriptionToSend = description;

                const updatedDeck = await deckAPI.updateDeck(currentDeck.id, {
                    title: editDeckData.title.trim(),
                    description: descriptionToSend
                });

                setCurrentDeck(updatedDeck);
                navigation.setOptions({ title: updatedDeck.title });

                if (onDeckUpdated) {
                    onDeckUpdated(updatedDeck);
                }

                setEditDeckModalVisible(false);
                Alert.alert('Sucesso', 'Deck atualizado com sucesso!');
            } catch (error) {
                Alert.alert('Erro', 'Não foi possível atualizar o deck');
            }
            return;
        }

        // Se o nome mudou, o backend trata a verificação diferenciada
        try {
            const description = editDeckData.description.trim();
            const descriptionToSend = description;

            const updatedDeck = await deckAPI.updateDeck(currentDeck.id, {
                title: editDeckData.title.trim(),
                description: descriptionToSend
            });

            setCurrentDeck(updatedDeck);
            navigation.setOptions({ title: updatedDeck.title });

            if (onDeckUpdated) {
                onDeckUpdated(updatedDeck);
            }

            setEditDeckModalVisible(false);
            Alert.alert('Sucesso', 'Deck atualizado com sucesso!');
        } catch (error: any) {
            // Verifica se o erro é de nome duplicado vindo do backend
            if (error.response?.data?.error?.includes('já existe') ||
                error.message?.includes('já existe')) {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    position: 'top',
                    text2: error.response?.data?.error || 'Já existe um deck com este nome'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    position: 'top',
                    text2: 'Não foi possível atualizar o deck'
                });
            }
        }
    };

    const handleEditCard = (card: Card) => {
        setSelectedCard(card);
        setEditCardData({
            id: card.id,
            question: card.question || '',
            questionImage: card.questionImage || null,
            answer: card.answer
        });
        setEditCardModalVisible(true);
    };

    const updateCard = async () => {
        const hasQuestionText = editCardData.question?.trim();
        const hasQuestionImage = editCardData.questionImage;

        if (!hasQuestionText && !hasQuestionImage) {
            Alert.alert('Erro', 'A pergunta deve conter texto ou imagem');
            return;
        }

        if (!editCardData.answer.trim()) {
            Alert.alert('Erro', 'A resposta é obrigatória');
            return;
        }

        try {
            const updatedCard = await cardAPI.updateCard(currentDeck!.id, editCardData.id, {
                question: hasQuestionText ? editCardData.question.trim() : null,
                questionImage: editCardData.questionImage,
                answer: editCardData.answer.trim()
            });

            setCards(prev => prev.map(card =>
                card.id === editCardData.id ? updatedCard : card
            ));

            setEditCardModalVisible(false);
            setSelectedCard(null);
            Alert.alert('Sucesso', 'Card atualizado com sucesso!');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o card');
        }
    };

    const getDeleteCardMessage = () => {
        if (!selectedCard) return null;

        const questionPreview = selectedCard.question
            ? selectedCard.question.substring(0, 30) + (selectedCard.question.length > 30 ? '...' : '')
            : 'Card com imagem';

        return (
            <Text style={styles.modalMessage}>
                Tem certeza que deseja excluir {'\n'}
                o card <Text style={styles.boldText}>{questionPreview}</Text>?
            </Text>
        );
    };

    const renderCard = ({ item }: { item: Card }) => (
        <View style={styles.cardItem}>
            <TouchableOpacity
                style={styles.cardContent}
                onPress={() => handleEditCard(item)}
            >
                {item.question && item.question.trim() && (
                    <Text style={styles.cardQuestion} numberOfLines={2}>
                        {item.question}
                    </Text>
                )}

                {item.questionImage && (
                    <View style={styles.imageThumbnailContainer}>
                        <Image
                            source={{ uri: item.questionImage }}
                            style={styles.imageThumbnail}
                            resizeMode="cover"
                        />
                    </View>
                )}

                <View style={styles.answerSection}>
                    <Text style={[
                        styles.cardAnswer,
                        !showAllAnswers && styles.hiddenAnswer
                    ]} numberOfLines={2}>
                        {showAllAnswers ? item.answer : '••••••••'}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => handleDeleteCard(item.id)}
                style={styles.deleteButton}
            >
                <Icon
                    name="delete-outline"
                    size={20}
                    color="#FF3B30"
                />
            </TouchableOpacity>
        </View>
    );

    // Função pickImage atualizada para usar upload real
    const pickImage = async (isEdit: boolean = false) => {
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
                try {
                    const uploadResponse = await uploadAPI.uploadImage(result.assets[0].uri);
                    const fullImageUrl = `${API_BASE_URL}${uploadResponse.imageUrl}`;

                    if (isEdit) {
                        setEditCardData({
                            ...editCardData,
                            questionImage: fullImageUrl
                        });
                    }
                } catch (uploadError) {
                    Alert.alert('Erro', 'Não foi possível fazer upload da imagem');
                }
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível selecionar a imagem');
        }
    };

    if (loading || !currentDeck) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Carregando cards...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Modais - SEMPRE NO TOPO */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={studyModalVisible}
                onRequestClose={() => setStudyModalVisible(false)}
                accessibilityViewIsModal={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}
                    importantForAccessibility="yes"
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Configurar Estudo</Text>
                        <Text style={styles.modalMessage}>
                            Este deck possui {cards.length} card{cards.length !== 1 ? 's' : ''}.
                        </Text>

                        {/* CONTADOR */}
                        <View style={styles.counterContainer}>
                            <Text style={styles.counterLabel}>Quantidade de cards para estudar:</Text>

                            <View style={styles.counterControls}>
                                <TouchableOpacity
                                    style={[styles.counterButton, studyCardCount === '1' && styles.counterButtonDisabled]}
                                    onPress={() => {
                                        const current = parseInt(studyCardCount) || 1;
                                        if (current > 1) {
                                            setStudyCardCount((current - 1).toString());
                                        }
                                    }}
                                    disabled={studyCardCount === '1'}
                                >
                                    <Text style={styles.counterButtonText}>-</Text>
                                </TouchableOpacity>

                                <TextInput
                                    style={styles.counterInput}
                                    value={studyCardCount}
                                    onChangeText={(text) => {
                                        // Permite apenas números
                                        const numericValue = text.replace(/[^0-9]/g, '');
                                        if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= cards.length)) {
                                            setStudyCardCount(numericValue);
                                        }
                                    }}
                                    keyboardType="numeric"
                                    maxLength={cards.length.toString().length}
                                    textAlign="center"
                                />

                                <TouchableOpacity
                                    style={[styles.counterButton, studyCardCount === cards.length.toString() && styles.counterButtonDisabled]}
                                    onPress={() => {
                                        const current = parseInt(studyCardCount) || 1;
                                        if (current < cards.length) {
                                            setStudyCardCount((current + 1).toString());
                                        }
                                    }}
                                    disabled={studyCardCount === cards.length.toString()}
                                >
                                    <Text style={styles.counterButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.counterHint}>
                                Mínimo: 1 | Máximo: {cards.length}
                            </Text>
                        </View>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setStudyModalVisible(false)}
                            >
                                <Text style={[styles.cancelButtonText, styles.centeredButtonText]}>Cancelar</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.studyAllButton]}
                                onPress={startStudyAllSession}
                            >
                                <Text style={[styles.studyAllButtonText, styles.centeredButtonText]}>Estudar Todos</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.modalButton, styles.studyButton]}
                                onPress={startStudySession}
                            >
                                <Text style={[styles.studyButtonText, styles.centeredButtonText]}>Iniciar Estudo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editDeckModalVisible}
                onRequestClose={() => setEditDeckModalVisible(false)}
                accessibilityViewIsModal={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}
                    importantForAccessibility="yes"
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Deck</Text>

                        <TextInput
                            style={styles.textInput}
                            placeholder="Título do deck"
                            value={editDeckData.title}
                            onChangeText={(text) => setEditDeckData({ ...editDeckData, title: text })}
                        />

                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            placeholder="Descrição (opcional)"
                            value={editDeckData.description}
                            onChangeText={(text) => setEditDeckData({ ...editDeckData, description: text })}
                            multiline
                            numberOfLines={3}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditDeckModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={updateDeck}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={editCardModalVisible}
                onRequestClose={() => setEditCardModalVisible(false)}
                accessibilityViewIsModal={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}
                    importantForAccessibility="yes"
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Editar Card</Text>

                        <Text style={styles.label}>Pergunta *</Text>
                        <Text style={styles.hint}>(texto, imagem ou ambos)</Text>

                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            placeholder="Digite a pergunta..."
                            value={editCardData.question}
                            onChangeText={(text) => setEditCardData({ ...editCardData, question: text })}
                            multiline
                            numberOfLines={2}
                        />

                        <View style={styles.imageSection}>
                            {editCardData.questionImage ? (
                                <View style={styles.imagePreviewContainer}>
                                    <Image
                                        source={{ uri: editCardData.questionImage }}
                                        style={styles.imagePreview}
                                    />
                                    <TouchableOpacity
                                        style={styles.removeImageButton}
                                        onPress={() => setEditCardData({ ...editCardData, questionImage: null })}
                                    >
                                        <Text style={styles.removeImageText}>×</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity
                                    style={styles.addImageButton}
                                    onPress={() => pickImage(true)}
                                >
                                    <Text style={styles.addImageIcon}>📷</Text>
                                    <Text style={styles.addImageText}>Adicionar Imagem</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                        <Text style={styles.label}>Resposta *</Text>
                        <TextInput
                            style={[styles.textInput, styles.textArea]}
                            placeholder="Resposta..."
                            value={editCardData.answer}
                            onChangeText={(text) => setEditCardData({ ...editCardData, answer: text })}
                            multiline
                            numberOfLines={2}
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setEditCardModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={updateCard}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteCardModalVisible}
                onRequestClose={() => setDeleteCardModalVisible(false)}
                accessibilityViewIsModal={true}
                statusBarTranslucent={true}
            >
                <View style={styles.modalOverlay}
                    importantForAccessibility="yes"
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                        {getDeleteCardMessage()}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteCardModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButtonModal]}
                                onPress={confirmDeleteCard}
                            >
                                <Text style={styles.deleteButtonTextModal}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Conteúdo Principal - DEPOIS dos Modais */}

            {/* Header com título e ícones */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    {/* Linha dos ícones alinhados à direita */}
                    <View style={styles.iconsRow}>
                        <View style={styles.headerIcons}>
                            {/* Ícone Editar - Cor do texto do título */}
                            <TouchableOpacity
                                style={styles.editIcon}
                                onPress={handleEditDeck}
                            >
                                <Icon name="edit" size={20} color="#333" />
                            </TouchableOpacity>

                            {/* Ícone Compartilhar - Azul */}
                            <TouchableOpacity
                                style={styles.shareIcon}
                                onPress={handleShareDeck}
                            >
                                <Icon name="share" size={20} color="#007AFF" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Linha do título centralizado */}
                    <View style={styles.titleRow}>
                        <Text style={styles.deckTitle}>{currentDeck.title}</Text>
                    </View>

                    {/* Badge "Compartilhado" */}
                    {isSharedDeck && (
                        <View style={styles.sharedDeckBadge}>
                            <Icon name="link" size={12} color="#FFF" />
                            <Text style={styles.sharedDeckBadgeText}>Compartilhado</Text>
                        </View>
                    )}

                    {/* Descrição */}
                    {currentDeck.description != null && currentDeck.description.trim() !== '' && (
                        <Text style={styles.deckDescription}>{currentDeck.description}</Text>
                    )}

                    {/* Contagem de cards */}
                    <Text style={styles.cardsCount}>
                        {filteredCards.length} de {cards.length} card{cards.length !== 1 ? 's' : ''}
                    </Text>
                </View>
            </View>

            {/* Barra de Pesquisa */}
            <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar cards..."
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                            <Icon name="close" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* Botão Estudar e Ícone Visibilidade */}
            <View style={styles.actionsRow}>
                {/* Botão Estudar */}
                <TouchableOpacity
                    style={[
                        styles.studyButton,
                        cards.length === 0 && styles.studyButtonDisabled
                    ]}
                    onPress={handleStudyDeck}
                    disabled={cards.length === 0}
                >
                    <Icon name="school" size={18} color="#FFF" />
                    <Text style={styles.studyButtonText}>Estudar</Text>
                </TouchableOpacity>

                {/* Ícone Visibilidade */}
                <TouchableOpacity
                    style={styles.visibilityIconButton}
                    onPress={() => setShowAllAnswers(!showAllAnswers)}
                >
                    <Icon
                        name={showAllAnswers ? "visibility-off" : "visibility"}
                        size={22}
                        color="#FFF"
                    />
                </TouchableOpacity>
            </View>

            {/* Lista de Cards ou Estado Vazio */}
            {filteredCards.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="content-paste-off" size={64} color="#CCC" />
                    <Text style={styles.emptyTitle}>
                        {searchQuery ? 'Nenhum card encontrado' : 'Nenhum card criado'}
                    </Text>
                    <Text style={styles.emptyDescription}>
                        {searchQuery
                            ? 'Tente ajustar os termos da busca'
                            : 'Adicione cards a este deck para começar a estudar!'
                        }
                    </Text>
                    {!searchQuery && (
                        <TouchableOpacity style={styles.createButton} onPress={handleCreateCard}>
                            <Text style={styles.createButtonText}>Criar Primeiro Card</Text>
                        </TouchableOpacity>
                    )}
                </View>
            ) : (
                <View style={styles.listContainer}>
                    <FlatList
                        data={filteredCards}
                        renderItem={renderCard}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.list}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        showsVerticalScrollIndicator={false}
                        ListFooterComponent={<View style={styles.fabSpacer} />}
                    />
                </View>
            )}

            {/* FAB SEMPRE VISÍVEL */}
            {cards.length > 0 && (
                <View style={styles.fabContainer}>
                    <TouchableOpacity style={styles.fab} onPress={handleCreateCard}>
                        <Icon name="add" size={24} color="#FFF" />
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};