import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    // Container principal
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },

    // Header e informações do deck
    header: {
        backgroundColor: '#FFF',
        padding: 20,
        paddingTop: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerInfo: {
        alignItems: 'center',
    },
    headerContent: {
        alignItems: 'center',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 12,
    },

    // Ícones do header
    iconsRow: {
        width: '100%',
        marginBottom: 8,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 16,
    },
    shareIconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    editIcon: {
        // Sem estilo - apenas o ícone azul
    },
    editButton: {
        padding: 2,
    },
    editButtonText: {
        fontSize: 16,
    },

    // Título e descrição do deck
    titleRow: {
        width: '100%',
        marginBottom: 8,
    },
    deckTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
    deckTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    deckDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 8,
        lineHeight: 20,
    },
    cardsCount: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },

    // Badges de compartilhamento
    sharedDeckBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        gap: 4,
        alignSelf: 'center',
        marginBottom: 8,
    },
    sharedDeckBadgeText: {
        color: '#FFF',
        fontSize: 10,
        fontWeight: '600',
        fontStyle: 'italic',
    },
    shareIcon: {
        // Sem estilo
    },
    // Seção de busca
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
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
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    searchIcon: {
        marginRight: 4,
    },
    clearButton: {
        padding: 4,
    },

    // Seção de ações principais
    actionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 12,
    },
    studyButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    studyButtonDisabled: {
        backgroundColor: '#CCC',
        opacity: 0.6,
    },
    studyButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    shareButton: {
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
    shareButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },

    // Lista de cards
    listContainer: {
        flex: 1,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },
    cardItem: {
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
    cardContent: {
        flex: 1,
        marginRight: 12,
    },
    cardQuestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
        lineHeight: 20,
    },

    // Seção de resposta do card
    answerSection: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    cardAnswer: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        marginRight: 8,
    },
    hiddenAnswer: {
        color: '#999',
        fontStyle: 'italic',
    },

    // Botões de ação do card
    actionIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E9ECEF',
    },
    studyIconButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    iconButtonDisabled: {
        backgroundColor: '#F5F5F5',
        borderColor: '#E5E5E5',
        opacity: 0.5,
    },
    deleteButton: {
        padding: 4,
    },

    // Indicadores de compartilhamento
    sharedCardIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        gap: 4,
        alignSelf: 'flex-start',
        marginTop: 8,
    },
    sharedCardText: {
        color: '#666',
        fontSize: 10,
        fontWeight: '500',
    },

    // Contador de cards para estudo
    counterContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    counterLabel: {
        fontSize: 16,
        color: '#333',
        marginBottom: 12,
        textAlign: 'center',
    },
    counterControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    counterButton: {
        width: 44,
        height: 44,
        borderRadius: 8,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterButtonDisabled: {
        backgroundColor: '#CCC',
    },
    counterButtonText: {
        fontSize: 20,
        color: '#FFF',
        fontWeight: 'bold',
    },
    counterInput: {
        width: 60,
        height: 44,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 8,
        marginHorizontal: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        backgroundColor: '#FFF',
        textAlign: 'center',
    },
    counterHint: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },

    // Botões de visibilidade
    visibilityButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#5D6D7E',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#808080',
        gap: 8,
    },
    visibilityButtonActive: {
        backgroundColor: '#34495E',
        borderColor: '#2C3E50',
    },
    visibilityGlobalButton: {
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    visibilityIconButton: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5D6D7E',
        borderRadius: 12,
    },
    visibilityButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#FFF',
    },
    visibilityButtonTextActive: {
        color: '#FFF',
    },
    halfWidthButton: {
        flex: 1,
        minHeight: 44,
    },

    // FAB (Floating Action Button)
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    fab: {
        backgroundColor: '#007AFF',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    fabSpacer: {
        height: 30,
    },

    // Estados vazios e loading
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

    // Botões de ação gerais
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#A0522D',
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 8,
    },
    actionButtonDisabled: {
        backgroundColor: '#A9A9A9',
        opacity: 0.6,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
    },
    actionButtonTextDisabled: {
        color: '#CCC',
    },
    studyAllButton: {
        backgroundColor: '#34C759',
        borderWidth: 1,
        borderColor: '#34C759',
    },
    studyAllButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
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
    },
    centeredButtonText: {
        textAlign: 'center',
    },

    // Tooltips e ícones
    iconWithTooltip: {
        alignItems: 'center',
    },
    tooltipText: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
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

    // Inputs de formulário
    textInput: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 8,
        backgroundColor: '#FFF',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputHint: {
        fontSize: 12,
        color: '#999',
        marginBottom: 16,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    hint: {
        fontSize: 11,
        color: '#666',
        marginBottom: 5,
        fontStyle: 'italic',
    },

    // Botões do modal
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
    saveButton: {
        backgroundColor: '#007AFF',
    },
    saveButtonText: {
        color: 'white',
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

    // Gerenciamento de imagens
    imageSection: {
        marginVertical: 10,
    },
    imagePreviewContainer: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 5,
    },
    imagePreview: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    imageThumbnailContainer: {
        marginVertical: 8,
        borderRadius: 8,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    imageThumbnail: {
        width: 60,
        height: 45,
        borderRadius: 6,
    },
    removeImageButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(0,0,0,0.7)',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    removeImageText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    addImageButton: {
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FA',
        marginTop: 5,
    },
    addImageIcon: {
        fontSize: 20,
        marginBottom: 5,
    },
    addImageText: {
        color: '#007AFF',
        fontSize: 12,
        fontWeight: '600',
    },
    imageIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginTop: 4,
    },
    imageIndicatorText: {
        fontSize: 12,
        color: '#666',
        marginLeft: 4,
    },
});

export default styles;