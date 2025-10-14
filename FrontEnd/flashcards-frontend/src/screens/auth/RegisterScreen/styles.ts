import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    // ===== ESTILOS PRINCIPAIS =====
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center', // ADICIONE ISSO PARA CENTRALIZAR
        minHeight: '100%', // GARANTE QUE OCUPE TODA A ALTURA
    },

    headerContainer: {
        marginBottom: 30, // AUMENTEI PARA MAIS ESPAÇO
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },

    // ===== INPUTS =====
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 20, // MESMO ESPAÇAMENTO PARA TODOS OS CAMPOS
    },
    passwordInputContainer: {
        position: 'relative',
    },
    passwordInput: {
        paddingRight: 50,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        top: 13,
        zIndex: 1,
    },
    inputError: {
        borderColor: '#ff3b30',
    },

    // ===== VALIDAÇÃO =====
    requirementsContainer: {
        marginTop: 8,
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff3cd',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ffeaa7',
    },
    requirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#856404',
        marginBottom: 4,
    },
    requirementMissing: {
        fontSize: 12,
        color: '#856404',
        marginLeft: 8,
    },
    errorText: {
        color: '#dc3545',
        fontSize: 12,
        marginBottom: 2,
    },

    // ===== BOTÕES =====
    button: {
        backgroundColor: '#4CAF50', // VERDE como estava antes
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    // ===== LINK DE LOGIN =====
    loginLink: {
        alignItems: 'center',
    },
    loginText: {
        color: '#666',
        fontSize: 14,
    },
    loginTextBold: {
        color: '#007AFF',
        fontWeight: '600',
    },

    // ===== MODAL =====
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 15,
        minWidth: 300,
        margin: 20,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#000000'
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
        color: '#333'
    },
    modalButton: {
        backgroundColor: '#4CAF50', // VERDE como estava antes
        padding: 15,
        borderRadius: 8,
        marginTop: 10
    },
    modalButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16
    },
    passwordErrorsContainer: {
        marginBottom: 12,
    },
    passwordRequirementsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        color: '#495057',
    },
    passwordRequirementText: {
        fontSize: 12,
        marginBottom: 4,
    },
    requirementValid: {
        color: '#28a745',
        fontWeight: '500',
    },
    requirementInvalid: {
        color: '#6c757d',
    },
    currentErrorsContainer: {
        marginBottom: 16,
        padding: 12,
        backgroundColor: '#fff3cd',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ffeaa7',
    },
    currentErrorsTitle: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#856404',
    },
    currentErrorText: {
        fontSize: 12,
        color: '#856404',
        marginBottom: 2,
    },
});