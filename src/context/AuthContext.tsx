import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  department?: string;
}

// Define auth context type
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user database
const USERS_STORAGE_KEY = 'papertrail_users';

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Get users from localStorage
  const getUsers = (): Record<string, { name: string; email: string; password: string; department?: string }> => {
    const users = localStorage.getItem(USERS_STORAGE_KEY);
    return users ? JSON.parse(users) : {};
  };

  // Save users to localStorage
  const saveUsers = (users: Record<string, any>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    
    // Check if user exists and password matches
    if (users[email] && users[email].password === password) {
      const currentUser = {
        id: email,
        name: users[email].name,
        email,
        department: users[email].department
      };
      
      setUser(currentUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      return true;
    }
    
    return false;
  };

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = getUsers();
    
    // Check if user already exists
    if (users[email]) {
      return false;
    }
    
    // Add new user
    users[email] = { name, email, password };
    saveUsers(users);
    
    // Auto login after signup
    const currentUser = {
      id: email,
      name,
      email,
      department: ''
    };
    
    setUser(currentUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
    return true;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};