
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username?: string;
  name?: string;
  email: string;
  profileImage: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (name: string, profileImage?: string) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  // Allow bypassing auth entirely in development/preview by setting VITE_BYPASS_AUTH=1
  // This lets the app behave as if a user is always logged in ("ignore logins").
  const BYPASS_AUTH = import.meta?.env?.VITE_BYPASS_AUTH === '1';
  const DUMMY_USER: User = {
    id: 'dev-user',
    email: 'dev@example.com',
    name: 'Developer User',
    profileImage: ''
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else if (BYPASS_AUTH) {
      // Auto-set dummy user when bypass flag is enabled and nothing stored yet
      setCurrentUser(DUMMY_USER);
      localStorage.setItem('currentUser', JSON.stringify(DUMMY_USER));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (BYPASS_AUTH) {
      setCurrentUser(DUMMY_USER);
      localStorage.setItem('currentUser', JSON.stringify(DUMMY_USER));
      return true;
    }
    
    // Validate input
    if (!email || !password) {
      return false;
    }
    
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: User) => 
      u.email.toLowerCase() === email.toLowerCase() && (u as User & { password: string }).password === password
    );
    
    if (user) {
      const { password: _, ...userWithoutPassword } = user as User & { password: string };
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    if (BYPASS_AUTH) {
      // Even in bypass mode, simulate real signup behavior but with dummy user
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: User) => u.email === email)) {
        return false; // Still reject if email exists
      }
      // Add to users list but keep dummy user as current
      const newUser = { id: Date.now().toString(), email, password, name, profileImage: '' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    
    // Validate input
    if (!email || !password || !name) {
      return false;
    }
    
    if (password.length < 6) {
      return false;
    }
    
    // Simulate API call
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists (case insensitive)
    if (users.some((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      password,
      name: name.trim(),
      profileImage: ''
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    const { password: _, ...userWithoutPassword } = newUser;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    return true;
  };

  const logout = () => {
    if (BYPASS_AUTH) {
      // In bypass mode, immediately restore dummy user so the UI always stays "logged in".
      setCurrentUser(DUMMY_USER);
      localStorage.setItem('currentUser', JSON.stringify(DUMMY_USER));
    } else {
      setCurrentUser(null);
      localStorage.removeItem('currentUser');
    }
  };

  const updateProfile = (name: string, profileImage?: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, name, profileImage };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));

      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
      if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name, profileImage };
        localStorage.setItem('users', JSON.stringify(users));
      }
    }
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!currentUser) return false;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.id === currentUser.id);
    
    if (userIndex !== -1 && (users[userIndex] as any).password === currentPassword) {
      (users[userIndex] as any).password = newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
    return false;
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    changePassword,
  isAuthenticated: !!currentUser || BYPASS_AUTH
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
