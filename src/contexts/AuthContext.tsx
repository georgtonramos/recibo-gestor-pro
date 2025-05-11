
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin } from '../services/authService';
import { useToast } from '@/hooks/use-toast';
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
  login: (email: string, password: string) => Promise<void>;
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

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call the actual API for login
      const response = await apiLogin({ email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.token);
      
      // For demo purposes, we'll hardcode a user object based on email
      // In a real app, the API would return user info or you'd make another call
      let userData: User;
      
      if (email === 'admin@exemplo.com') {
        userData = {
          id: '1',
          name: 'Admin',
          email: 'admin@exemplo.com',
          role: 'admin'
        };
      } else {
        userData = {
          id: '2',
          name: 'João Funcionário',
          email: email,
          role: 'employee'
        };
      }
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta.",
      });
    } catch (err) {
      let errorMsg = "Falha ao fazer login";
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        errorMsg = "Credenciais inválidas";
      } else if (axios.isAxiosError(err) && err.response) {
        errorMsg = `Erro: ${err.response.data.message || err.message}`;
      } else if (err instanceof Error) {
        errorMsg = err.message;
      }
      
      setError(errorMsg);
      toast({
        title: "Erro de autenticação",
        description: errorMsg,
        variant: "destructive",
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
      title: "Logout realizado",
      description: "Sua sessão foi encerrada com sucesso.",
    });
  };

  const value = {
    user,
    loading,
    login,
    logout,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
