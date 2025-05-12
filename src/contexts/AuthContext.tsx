import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin } from '../services/authService';
import { useToast } from '@/hooks/use-toast';
import apiClient from '@/services/apiClient';
import axios from 'axios';

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'employee';
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true);
    setError(null);

    try {
      // 🔐 Passo 1: login via /auth/login
      const response = await apiLogin({ email, senha });
      const token = response.access_token;
      localStorage.setItem('token', token);

      // 🔍 Passo 2: buscar perfil real via /auth/me
      const meResponse = await apiClient.get<User>('/auth/me');
      const userData = meResponse.data;

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      toast({
        title: 'Login realizado com sucesso!',
        description: `Bem-vindo, ${userData.name}.`,
      });
    } catch (err) {
      let errorMsg = 'Falha ao fazer login';

      if (axios.isAxiosError(err) && err.response?.status === 401) {
        errorMsg = 'Credenciais inválidas';
      } else if (axios.isAxiosError(err) && err.response) {
        errorMsg = `Erro: ${err.response.data.message || err.message}`;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }

      setError(errorMsg);

      toast({
        title: 'Erro de autenticação',
        description: errorMsg,
        variant: 'destructive',
      });

      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    toast({
      title: 'Logout realizado',
      description: 'Sua sessão foi encerrada com sucesso.',
    });
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
