import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        paddingTop: 60,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    exitButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#FF3B30',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exitButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: '300',
        lineHeight: 24,
    },
    progressContainer: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 20,
    },
    progressBar: {
        width: '100%',
        height: 6,
        backgroundColor: '#E5E5E5',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#007AFF',
        borderRadius: 3,
    },
    progressText: {
        fontSize: 12,
        color: '#666',
        fontWeight: '600',
    },
    deckInfo: {
        padding: 20,
        alignItems: 'center',
    },
    deckTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
        textAlign: 'center',
    },
    deckDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    cardContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '100%',
        minHeight: 200,
        backgroundColor: '#FFF',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        padding: 24,
        justifyContent: 'center',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'center',
    },
    cardQuestion: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        lineHeight: 28,
    },
    answerSection: {
        marginTop: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginBottom: 20,
    },
    cardAnswer: {
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        lineHeight: 26,
        fontWeight: '500',
    },
    exerciseContainer: {
        padding: 20,
        paddingBottom: 40,
        flex: 1,
    },
    exerciseTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
        textAlign: 'center',
    },

    // Multiple Choice
    multipleChoiceContainer: {
        gap: 12,
    },
    multipleChoiceOption: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        minHeight: 50,
        justifyContent: 'center',
    },
    multipleChoiceText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        lineHeight: 18,
    },
    selectedOption: {
        backgroundColor: '#007AFF',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        minHeight: 50,
        justifyContent: 'center',
    },
    selectedOptionText: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 18,
    },
    correctOption: {
        backgroundColor: '#4CAF50',
        borderWidth: 2,
        borderColor: '#4CAF50',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        minHeight: 50,
        justifyContent: 'center',
    },
    correctOptionText: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 18,
    },
    wrongOption: {
        backgroundColor: '#FF3B30',
        borderWidth: 2,
        borderColor: '#FF3B30',
        borderRadius: 12,
        padding: 12,
        marginBottom: 8,
        minHeight: 50,
        justifyContent: 'center',
    },
    wrongOptionText: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '600',
        lineHeight: 18,
    },

    // Typing
    typingContainer: {
        gap: 16,
    },
    typingInput: {
        backgroundColor: '#FFF',
        borderWidth: 2,
        borderColor: '#E5E5E5',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    submitButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        backgroundColor: '#CCC',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    typingFeedback: {
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    feedbackText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    },
    correctFeedback: {
        color: '#34C759',
    },
    wrongFeedback: {
        color: '#FF3B30',
    },

    // Flashcard
    flashcardContainer: {
        gap: 16,
    },
    showAnswerButton: {
        backgroundColor: '#007AFF',
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
    },
    showAnswerButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600',
    },
    answerActions: {
        alignItems: 'center',
    },
    rememberText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
        textAlign: 'center',
    },
    answerButtons: {
        flexDirection: 'row',
        gap: 12,
        width: '100%',
    },
    answerButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    wrongButton: {
        backgroundColor: '#FF3B30',
    },
    correctButton: {
        backgroundColor: '#34C759',
    },
    answerButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // Exercise Type Indicator
    exerciseTypeIndicator: {
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exerciseTypeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseTypeImage: {
        width: 32,
        height: 32,
        resizeMode: 'contain',
    },

    // Modal de Confirmação de Saída
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
        marginBottom: 24,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    modalButton: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    exitButtonModal: {
        backgroundColor: '#FF3B30',
    },
    exitButtonTextModal: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    // Tela de Resultados
    resultContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 20,
        justifyContent: 'center',
    },
    resultTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    resultCard: {
        backgroundColor: '#FFF',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        marginBottom: 30,
    },
    resultDeckName: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    resultStats: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    correctStat: {
        color: '#34C759',
    },
    wrongStat: {
        color: '#FF3B30',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
    },
    percentageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    percentageLabel: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    percentageValue: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    goodPercentage: {
        color: '#34C759',
    },
    mediumPercentage: {
        color: '#FF9500',
    },
    badPercentage: {
        color: '#FF3B30',
    },
    resultMessage: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    resultMessageText: {
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
        lineHeight: 20,
    },
    resultActions: {
        gap: 12,
    },
    resultButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    finishButton: {
        backgroundColor: '#007AFF',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    finishButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // Imagens
    questionImageContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    questionImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },

    // Modal de Seleção de Modo
    modeSelectionContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
        paddingTop: 60,
    },
    modeSelectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: '#FFF',
    },
    modeSelectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
    headerPlaceholder: {
        width: 40,
    },
    modeSelectionContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 8,
        marginTop: 16,
    },
    modeSelectionSubtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
    },
    modeOptions: {
        gap: 12,
    },
    modeOption: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E5E5E5',
    },
    modeOptionDisabled: {
        opacity: 0.6,
    },
    modeIcon: {
        width: 48,
        height: 48,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 8,
    },
    modeTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 4,
    },
    modeDescription: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        lineHeight: 16,
    },
    requirementText: {
        fontSize: 11,
        color: '#FF9500',
        fontStyle: 'italic',
    },
});

export default styles;