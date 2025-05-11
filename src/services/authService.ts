
import apiClient from './apiClient';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  return response.data;
};
