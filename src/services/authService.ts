
import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  } catch (error: any) {
    // Check if this is our mock response (for development only)
    if (error.response?.status === 200 && error.response?.data?.token) {
      return error.response.data;
    }
    
    // Handle network errors specifically
    if (error.code === 'ERR_NETWORK') {
      throw new Error('Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde.');
    }
    
    // Re-throw the error for other handlers
    throw error;
  }
};
