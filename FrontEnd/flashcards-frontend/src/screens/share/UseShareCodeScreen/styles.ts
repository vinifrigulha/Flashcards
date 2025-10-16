// src/screens/share/useShareCodeStyles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    // Layout Principal
    container: {
        flexGrow: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
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

    // Seção de Entrada do Código
    inputSection: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    codeInputContainer: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },
    codeInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    previewButton: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        minWidth: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },

    // Scanner de QR Code
    scannerContainer: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    scannerOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerFrame: {
        width: width * 0.7,
        height: width * 0.7,
        borderWidth: 2,
        borderColor: 'transparent',
        position: 'relative',
    },
    cornerTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderLeftWidth: 4,
        borderTopWidth: 4,
        borderColor: '#007AFF',
    },
    cornerTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRightWidth: 4,
        borderTopWidth: 4,
        borderColor: '#007AFF',
    },
    cornerBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: 30,
        height: 30,
        borderLeftWidth: 4,
        borderBottomWidth: 4,
        borderColor: '#007AFF',
    },
    cornerBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 30,
        height: 30,
        borderRightWidth: 4,
        borderBottomWidth: 4,
        borderColor: '#007AFF',
    },
    scannerText: {
        color: '#FFF',
        fontSize: 16,
        marginTop: 30,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 12,
        borderRadius: 8,
        fontWeight: '500',
    },
    closeScannerButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 25,
        padding: 10,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scannerButton: {
        flexDirection: 'row',
        backgroundColor: '#34C759',
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: 8,
    },
    scannerButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },

    // Seção de Pré-visualização
    previewSection: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    previewCard: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
    },
    previewCardDisabled: {
        backgroundColor: '#F5F5F5',
        opacity: 0.7,
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
        lineHeight: 20,
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

    // Mensagens de Status
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
    },
    successText: {
        color: '#34C759',
        fontSize: 14,
        fontWeight: '500',
        marginTop: 8,
    },

    // Botões de Ação
    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 16,
    },
    actionButton: {
        flex: 1,
        padding: 16,
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
        color: '#666',
        fontSize: 14,
        fontWeight: '600',
    },
    useButton: {
        backgroundColor: '#34C759',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 100,
        flex: 1,
    },
    useButtonText: {
        color: '#FFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        flex: 1,
    },
    buttonDisabled: {
        opacity: 0.6,
    },

    // Instruções
    instructions: {
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: '600',
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