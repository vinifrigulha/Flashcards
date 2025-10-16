import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Layout principal
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    loadingContainer: {
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

    // Header
    header: {
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerInfo: {
        alignItems: 'flex-start',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 2,
    },
    screenTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    greeting: {
        fontSize: 16,
        color: '#666',
        marginTop: 2,
    },
    logoutButton: {
        padding: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 8,
        marginLeft: 10,
        minWidth: 40,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 4,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Busca e importação
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 12,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    searchIcon: {
        marginRight: 4,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    clearButton: {
        padding: 4,
    },
    importButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#007AFF',
        gap: 8,
    },
    importButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },

    // Lista de decks
    list: {
        padding: 16,
    },
    deckItem: {
        flexDirection: 'row',
        backgroundColor: '#FFF',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'flex-start',
    },
    sharedDeckItem: {
        backgroundColor: '#F8F9FA',
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    deckContent: {
        flex: 1,
        marginRight: 12,
    },
    deckHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    deckTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    deckDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
        lineHeight: 18,
    },
    cardsCount: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
        marginBottom: 4,
    },
    creationDate: {
        fontSize: 12,
        color: '#999',
    },

    // Ações do deck
    deckActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    shareButton: {
        padding: 8,
    },
    deleteButton: {
        padding: 4,
    },

    // Badge de deck compartilhado
    sharedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
    },
    sharedBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '600',
    },

    // Estado vazio
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 22,
    },
    emptyActions: {
        flexDirection: 'column',
        gap: 12,
        marginTop: 16,
        width: '100%',
    },
    createButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    createButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

    // Botão flutuante
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    // Modais
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 24,
        margin: 20,
        width: '85%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalMessage: {
        fontSize: 16,
        color: '#666',
        lineHeight: 22,
        marginBottom: 16,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
        color: '#333',
    },
    sharedWarning: {
        color: '#FF9500',
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
        fontWeight: '600',
    },
    deleteButtonModal: {
        backgroundColor: '#FF3B30',
    },
    deleteButtonTextModal: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default styles;