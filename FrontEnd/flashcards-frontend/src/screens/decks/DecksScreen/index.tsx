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
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Deck } from '../../../types';
import { deckAPI } from '../../../services/api';
import { DecksScreenNavigationProp } from '../../../types/navigation';
import { useAuth } from '../../../context/AuthContext';
import styles from './styles';

export const DecksScreen: React.FC = () => {
    const [decks, setDecks] = useState<Deck[]>([]);
    const [filteredDecks, setFilteredDecks] = useState<Deck[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deleteDeckModalVisible, setDeleteDeckModalVisible] = useState(false);
    const [logoutModalVisible, setLogoutModalVisible] = useState(false);
    const [selectedDeck, setSelectedDeck] = useState<Deck | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [deletedDeckIds, setDeletedDeckIds] = useState<Set<number>>(new Set());

    const navigation = useNavigation<DecksScreenNavigationProp>();
    const { user, logout } = useAuth();

    // Filtra decks baseado na busca
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredDecks(decks);
        } else {
            const query = searchQuery.toLowerCase().trim();
            const filtered = decks.filter(deck =>
                deck.title.toLowerCase().includes(query) ||
                (deck.description && deck.description.toLowerCase().includes(query))
            );
            setFilteredDecks(filtered);
        }
    }, [searchQuery, decks]);

    // Logout e confirmação
    const handleLogout = () => {
        setLogoutModalVisible(true);
    };

    const confirmLogout = async () => {
        setLogoutModalVisible(false);
        try {
            setIsLoggingOut(true);
            await logout();
            navigation.navigate('Login');
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível fazer logout');
        } finally {
            setIsLoggingOut(false);
        }
    };

    const cancelLogout = () => {
        setLogoutModalVisible(false);
    };

    // Carregamento de decks
    const loadDecks = async () => {
        try {
            const decksData = await deckAPI.getDecks();

            // Filtrar decks excluídos localmente
            const filteredDecksData = decksData.filter(deck => !deletedDeckIds.has(deck.id));

            setDecks(filteredDecksData);
            setFilteredDecks(filteredDecksData);
        } catch (error: any) {
            Alert.alert('Erro', 'Não foi possível carregar os decks');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    // Carrega decks quando a tela recebe foco
    useFocusEffect(
        React.useCallback(() => {
            loadDecks();
            setSearchQuery('');
        }, [])
    );

    const handleRefresh = () => {
        setRefreshing(true);
        loadDecks();
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    // Navegação e ações
    const handleCreateDeck = () => {
        navigation.navigate('CreateDeck');
    };

    const handleUseShareCode = () => {
        navigation.navigate('UseShareCode');
    };

    const handleDeleteDeck = (deck: Deck) => {
        setSelectedDeck(deck);
        setDeleteDeckModalVisible(true);
    };

    const handleShareDeck = (deck: Deck) => {
        navigation.navigate('ShareDeck', { deck });
    };

    // Exclusão de deck com tratamento de erro
    const confirmDeleteDeck = async () => {
        if (!selectedDeck) return;

        const deckIdToDelete = selectedDeck.id;

        // Fechar modal primeiro
        setDeleteDeckModalVisible(false);
        setSelectedDeck(null);

        try {
            // Tentar excluir no servidor primeiro
            await deckAPI.deleteDeck(deckIdToDelete);

            // Remover localmente após sucesso no servidor
            setDecks(prev => prev.filter(deck => deck.id !== deckIdToDelete));
            setFilteredDecks(prev => prev.filter(deck => deck.id !== deckIdToDelete));
            setDeletedDeckIds(prev => new Set(prev).add(deckIdToDelete));

        } catch (error: any) {
            Alert.alert(
                'Erro na exclusão',
                'Não foi possível excluir o deck no servidor. Recarregando a lista...',
                [
                    {
                        text: 'OK',
                        onPress: () => {
                            setLoading(true);
                            loadDecks();
                        }
                    }
                ]
            );
        }
    };

    const handleStudyDeck = (deck: Deck) => {
        navigation.navigate('DeckCards', { deck });
    };

    // Utilitários para informações do deck
    const getCardCount = (deck: Deck) => {
        return deck.cards?.length || 0;
    };

    const isSharedDeck = (deck: Deck) => {
        return deck.title.startsWith('Cópia - ');
    };

    // Mensagem de confirmação de exclusão com informações contextuais
    const getDeleteDeckMessage = () => {
        if (!selectedDeck) return null;

        const cardCount = getCardCount(selectedDeck);
        const isShared = isSharedDeck(selectedDeck);

        if (cardCount === 0) {
            return (
                <Text style={styles.modalMessage}>
                    Deseja realmente excluir o deck{'\n'}
                    <Text style={styles.boldText}>"{selectedDeck.title}"</Text>?
                    {isShared && (
                        <Text style={styles.sharedWarning}>
                            {'\n\n'}Este é um deck compartilhado. {'\n'}A exclusão não afetará o deck original.
                        </Text>
                    )}
                </Text>
            );
        } else {
            return (
                <Text style={styles.modalMessage}>
                    Deseja realmente excluir o deck{'\n'}
                    <Text style={styles.boldText}>"{selectedDeck.title}"</Text>?{'\n\n'}
                    Os <Text style={styles.boldText}>{cardCount} card{cardCount !== 1 ? 's' : ''}</Text> dentro dele também serão excluídos permanentemente.
                    {isShared && (
                        <Text style={styles.sharedWarning}>
                            {'\n\n'}Este é um deck compartilhado. {'\n'}A exclusão não afetará o deck original.
                        </Text>
                    )}
                </Text>
            );
        }
    };

    // Renderização do item do deck
    const renderDeckItem = ({ item }: { item: Deck }) => {
        const cardCount = getCardCount(item);
        const isShared = isSharedDeck(item);

        return (
            <View style={[
                styles.deckItem,
                isShared && styles.sharedDeckItem
            ]}>
                <TouchableOpacity
                    style={styles.deckContent}
                    onPress={() => handleStudyDeck(item)}
                >
                    <View style={styles.deckHeader}>
                        <Text style={styles.deckTitle}>{item.title}</Text>
                        {isShared && (
                            <View style={styles.sharedBadge}>
                                <Icon name="link" size={12} color="#FFF" />
                                <Text style={styles.sharedBadgeText}>Compartilhado</Text>
                            </View>
                        )}
                    </View>

                    {item.description && (
                        <Text style={styles.deckDescription}>{item.description}</Text>
                    )}
                    <Text style={styles.cardsCount}>
                        {cardCount} card{cardCount !== 1 ? 's' : ''}
                    </Text>
                    <Text style={styles.creationDate}>
                        Criado em {new Date(item.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                </TouchableOpacity>

                <View style={styles.deckActions}>
                    <TouchableOpacity
                        onPress={() => handleShareDeck(item)}
                        style={styles.shareButton}
                    >
                        <Icon name="share" size={18} color="#007AFF" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => handleDeleteDeck(item)}
                        style={styles.deleteButton}
                    >
                        <Icon name="delete-outline" size={20} color="#FF3B30" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    if (loading || isLoggingOut) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>
                    {isLoggingOut ? 'Saindo...' : 'Carregando decks...'}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Modal de Logout */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={logoutModalVisible}
                onRequestClose={cancelLogout}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmar Logout</Text>
                        <Text style={styles.modalMessage}>
                            Deseja realmente sair da aplicação?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={cancelLogout}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButtonModal]}
                                onPress={confirmLogout}
                            >
                                <Text style={styles.deleteButtonTextModal}>Sair</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Modal de Exclusão de Deck */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteDeckModalVisible}
                onRequestClose={() => setDeleteDeckModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirmar Exclusão</Text>
                        {getDeleteDeckMessage()}
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteDeckModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButtonModal]}
                                onPress={confirmDeleteDeck}
                            >
                                <Text style={styles.deleteButtonTextModal}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            {/* Header com informações do usuário */}
            <View style={styles.header}>
                <View style={styles.headerInfo}>
                    <View style={styles.titleRow}>
                        <Text style={styles.screenTitle}>Meus Decks</Text>
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={styles.logoutButton}
                            disabled={isLoggingOut}
                        >
                            <View style={styles.logoutIconContainer}>
                                <Icon name="logout" size={16} color="#FFF" />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.greeting}>
                        Olá, {user?.name || 'Usuário'}!
                    </Text>
                </View>
            </View>

            {/* Barra de busca e botão de importar */}
            <View style={styles.searchSection}>
                <View style={styles.searchContainer}>
                    <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar decks..."
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

                <TouchableOpacity
                    style={styles.importButton}
                    onPress={handleUseShareCode}
                >
                    <Icon name="file-download" size={20} color="#FFF" />
                    <Text style={styles.importButtonText}>Importar</Text>
                </TouchableOpacity>
            </View>

            {/* Lista de decks ou estado vazio */}
            {filteredDecks.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Icon name="folder-off" size={64} color="#CCC" />
                    <Text style={styles.emptyTitle}>
                        {searchQuery ? 'Nenhum deck encontrado' : 'Nenhum deck criado'}
                    </Text>
                    <Text style={styles.emptyDescription}>
                        {searchQuery
                            ? 'Tente ajustar os termos da busca'
                            : 'Crie seu primeiro deck para começar a organizar seus estudos!'
                        }
                    </Text>
                    <View style={styles.emptyActions}>
                        {!searchQuery && (
                            <TouchableOpacity style={styles.createButton} onPress={handleCreateDeck}>
                                <Text style={styles.createButtonText}>Criar Primeiro Deck</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            ) : (
                <FlatList
                    data={filteredDecks}
                    renderItem={renderDeckItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    showsVerticalScrollIndicator={false}
                />
            )}

            {/* Botão flutuante para criar novo deck */}
            {filteredDecks.length > 0 && (
                <TouchableOpacity style={styles.fab} onPress={handleCreateDeck}>
                    <Icon name="add" size={24} color="#FFF" />
                </TouchableOpacity>
            )}
        </View>
    );
};