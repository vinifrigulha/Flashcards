import api from './api';

export const uploadAPI = {
    uploadImage: async (imageUri: string) => {
        try {
            // Cria um FormData para enviar o arquivo
            const formData = new FormData();

            // Converte a URI para blob
            const response = await fetch(imageUri);
            const blob = await response.blob();

            // Cria um arquivo a partir do blob
            const file = new File([blob], 'card-image.jpg', { type: 'image/jpeg' });

            formData.append('image', file);

            // Faz o upload usando multipart/form-data
            const uploadResponse = await api.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return uploadResponse.data;

        } catch (error) {
            console.error('❌ Erro no upload:', error);
            throw error;
        }
    },
};