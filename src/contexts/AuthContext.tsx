
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

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
  if (!context) {
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

  // Check if the user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user:', e);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login function - in a real app, this would make an API call
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'admin@exemplo.com' && password === 'admin123') {
        const adminUser: User = {
          id: '1',
          name: 'Admin',
          email: 'admin@exemplo.com',
          role: 'admin'
        };
        setUser(adminUser);
        localStorage.setItem('user', JSON.stringify(adminUser));
      } else if (email === 'funcionario@exemplo.com' && password === 'func123') {
        const employeeUser: User = {
          id: '2',
          name: 'João Funcionário',
          email: 'funcionario@exemplo.com',
          role: 'employee'
        };
        setUser(employeeUser);
        localStorage.setItem('user', JSON.stringify(employeeUser));
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao fazer login');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};
