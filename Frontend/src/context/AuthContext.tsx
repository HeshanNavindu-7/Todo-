import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const token = localStorage.getItem('token');

    if (storedUser && token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // ✅ Signup and navigate to /todo
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', { name, email, password });
      const { token, user } = response.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);
  
      navigate('/todo');
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Signup error:", error.response?.data?.message || error.message);
        alert(error.response?.data?.message || "Signup failed. Please try again."); // Show the real error
      } else if (error instanceof Error) {
        console.error("Signup error:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  

  // ✅ Login and navigate to /todo
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setCurrentUser(user);

      navigate('/todo');
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Login error:", error.response?.data?.message || error.message);
      } else if (error instanceof Error) {
        console.error("Login error:", error.message);
      } else {
        console.error("An unknown error occurred.");
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Logout and navigate to /auth
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    delete axios.defaults.headers.common['Authorization'];
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
