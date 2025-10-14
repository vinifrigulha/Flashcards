import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
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
    iconsRow: {
        width: '100%',
        marginBottom: 8,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Alinha os ícones à direita
        gap: 16,
    },
    titleRow: {
        width: '100%',
        marginBottom: 8,
    },
    deckTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center', // Título centralizado
    },
    shareIcon: {
        // Sem estilo - apenas o ícone azul
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
    actionButtonDisabled: {
        backgroundColor: '#A9A9A9',
        opacity: 0.6,
    },
    actionButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
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
    deleteButton: {
        padding: 4,
        // Removido: width, height, borderRadius, backgroundColor, justifyContent, alignItems
    },
    // Removido: deleteButtonText (não é mais necessário)
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

    // Estilos dos Modais
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
    // Adicione aos styles
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
    hint: {
        fontSize: 11,
        color: '#666',
        marginBottom: 5,
        fontStyle: 'italic',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
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
    // Estilos para o contador
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
        width: 60, // MENOR
        height: 44,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 8,
        marginHorizontal: 12,
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        backgroundColor: '#FFF',
        textAlign: 'center', // CENTRALIZADO
    },

    counterHint: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },

    // Botão para estudar todos
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

    // Estilo para centralizar texto dos botões
    centeredButtonText: {
        textAlign: 'center',
    },
    // Novos estilos para funcionalidades de compartilhamento
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 12,
    },
    deckTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        flexWrap: 'wrap',
    },
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
    actionButtonTextDisabled: {
        color: '#CCC',
    },

    // NOVO LAYOUT: Seção de busca e compartilhar
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

    // Ajuste nos botões de ação para ter apenas um botão
    actions: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingBottom: 12,
        gap: 12,
    },

    // Container da lista para controlar o espaço
    listContainer: {
        flex: 1,
    },

    // Lista com padding bottom para o FAB
    list: {
        paddingHorizontal: 16,
        paddingBottom: 80, // Espaço para o FAB não cobrir os cards
    },

    // Container do FAB para posicionamento absoluto
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1, // Garante que fique acima do conteúdo
    },

    // FAB para criar novo card
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

    // Espaço no final da lista para o FAB não cobrir os cards
    fabSpacer: {
        height: 30, // Mesma altura do paddingBottom da lista
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
    iconWithTooltip: {
        alignItems: 'center',
    },
    tooltipText: {
        fontSize: 10,
        color: '#666',
        marginTop: 4,
        textAlign: 'center',
    },
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

    /* Nova seção de ações */
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
    visibilityIconButton: {
        width: 52,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#5D6D7E',
        borderRadius: 12,
    },
});

export default styles;