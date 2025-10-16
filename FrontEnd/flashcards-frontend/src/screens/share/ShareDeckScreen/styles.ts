import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Layout Principal
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
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    backButton: {
        padding: 4,
    },
    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
    },
    headerPlaceholder: {
        width: 32,
    },

    // Informações do Deck
    deckInfo: {
        backgroundColor: '#FFF',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
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
    },
    cardsCount: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
    },

    // Botões e Ações
    generateButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    generateButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
        textAlign: 'center',
        flex: 1,
    },
    buttonDisabled: {
        opacity: 0.6,
    },

    // Lista de Códigos
    codesList: {
        flex: 1,
        padding: 16,
    },
    codeItem: {
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
    },
    codeInfo: {
        flex: 1,
    },
    codeValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    codeDetails: {
        gap: 4,
    },
    codeDetail: {
        fontSize: 12,
        color: '#666',
    },
    expiredText: {
        color: '#FF3B30',
        fontWeight: '500',
    },
    codeActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    actionButton: {
        padding: 8,
    },

    // Estado Vazio
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginTop: 16,
        marginBottom: 8,
    },
    emptyDescription: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center',
        lineHeight: 20,
    },

    // Modal do QR Code
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        padding: 24,
        borderRadius: 16,
        margin: 20,
        alignItems: 'center',
        minHeight: 400,
        width: '85%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },
    qrContainer: {
        alignItems: 'center',
        marginVertical: 20,
        minHeight: 280,
    },
    shareCodeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#007AFF',
        marginTop: 16,
    },
    messageContainer: {
        height: 40,
        justifyContent: 'center',
        marginTop: 12,
    },
    copiedMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E8',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#4CAF50',
    },
    copiedMessageText: {
        color: '#2E7D32',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 6,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    copyButton: {
        backgroundColor: '#007AFF',
    },
    copyButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#8E8E93',
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Tela de Usar Código
    inputSection: {
        backgroundColor: '#FFF',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    codeInputContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    codeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#FFF',
    },
    previewButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
    },
    previewButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
    },
    previewSection: {
        backgroundColor: '#FFF',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    previewCard: {
        backgroundColor: '#F9F9F9',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    previewCardDisabled: {
        opacity: 0.6,
    },
    previewTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    previewDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    previewDetails: {
        gap: 6,
    },
    previewDetail: {
        fontSize: 12,
        color: '#666',
        flexDirection: 'row',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 12,
        color: '#FF3B30',
        fontWeight: '500',
        marginTop: 8,
    },
    successText: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: '500',
        marginTop: 8,
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    cancelButton: {
        backgroundColor: '#8E8E93',
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
    useButton: {
        backgroundColor: '#007AFF',
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    useButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
    },
    instructions: {
        backgroundColor: '#FFF',
        padding: 16,
        margin: 16,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    instruction: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        lineHeight: 20,
    },
});