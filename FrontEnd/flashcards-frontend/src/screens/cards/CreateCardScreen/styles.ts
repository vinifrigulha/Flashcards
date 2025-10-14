import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
        color: '#333',
        marginTop: 20,
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
        color: '#666',
        lineHeight: 22,
    },
    form: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 16,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        minHeight: 120,
        textAlignVertical: 'top',
    },
    charCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    button: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
    },
    cancelButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#DDD',
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '600',
    },
    submitButton: {
        backgroundColor: '#007AFF',
    },
    buttonDisabled: {
        backgroundColor: '#CCC',
    },
    submitButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
    // styles.js
    imageSection: {
        marginTop: 10,
    },
    addImageButton: {
        borderWidth: 2,
        borderColor: '#007AFF',
        borderStyle: 'dashed',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8F9FA',
    },
    addImageIcon: {
        fontSize: 24,
        marginBottom: 5,
    },
    addImageText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '600',
    },
    imagePreviewContainer: {
        position: 'relative',
        borderRadius: 10,
        overflow: 'hidden',
    },
    imagePreview: {
        width: '100%',
        height: 200,
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
    questionImageContainer: {
        marginVertical: 10,
        alignItems: 'center',
    },
    questionImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    hint: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
        fontStyle: 'italic',
    },
});

export default styles;