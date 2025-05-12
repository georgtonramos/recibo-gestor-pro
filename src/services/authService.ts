import apiClient from './apiClient';
import axios from 'axios';

interface LoginCredentials {
  email: string;
  senha: string;
}

interface LoginResponse {
  access_token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    console.log('🔐 Enviando credenciais para login:', credentials);

    const response = await apiClient.post('/auth/login', credentials);

    console.log('✅ Login bem-sucedido:', response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('❌ Erro Axios no login:');
      console.error('Status:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      console.error('Data:', error.response?.data);
      console.error('Mensagem:', error.message);
    } else {
      console.error('❌ Erro inesperado no login:', error);
    }

    throw error;
  }
};
