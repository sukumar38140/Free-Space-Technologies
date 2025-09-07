
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AdminUser {
  id: string;
  username: string;
  role: 'root' | 'admin';
  email: string;
}

interface AdminAuthContextType {
  currentUser: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isRootAdmin: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

// Predefined admin accounts (in production, this would be in a secure database)
const ADMIN_ACCOUNTS = [
  {
    id: '1',
    username: '24691F0071@mits.ac.in',
    password: 'Hemanth@71',
    role: 'root' as const,
    email: '24691F0071@mits.ac.in'
  },
  {
    id: '2',
    username: '24691F00A8@mits.ac.in',
    password: 'Kumar@12345',
    role: 'admin' as const,
    email: '24691F00A8@mits.ac.in'
  },
  {
    id: '3',
    username: '24691F00C3@mits.ac.in',
    password: 'Pujitha@C3',
    role: 'admin' as const,
    email: '24691F00C3@mits.ac.in'
  }
];

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  // Optional bypass flag for development to ignore admin login
  const BYPASS_ADMIN = import.meta?.env?.VITE_BYPASS_ADMIN === '1';
  const DUMMY_ADMIN: AdminUser = {
    id: 'dev-admin',
    username: 'dev-admin',
    role: 'root',
    email: 'dev-admin@example.com'
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    } else if (BYPASS_ADMIN) {
      setCurrentUser(DUMMY_ADMIN);
      localStorage.setItem('adminUser', JSON.stringify(DUMMY_ADMIN));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    console.log('Login attempt:', { username, passwordLength: password.length });
    
    if (BYPASS_ADMIN) {
      console.log('Admin bypass enabled, logging in with dummy admin');
      setCurrentUser(DUMMY_ADMIN);
      localStorage.setItem('adminUser', JSON.stringify(DUMMY_ADMIN));
      return true;
    }
    
    console.log('Checking credentials against admin accounts...');
    const account = ADMIN_ACCOUNTS.find(
      acc => acc.username === username && acc.password === password
    );

    console.log('Found account:', !!account);
    
    if (account) {
      const user: AdminUser = {
        id: account.id,
        username: account.username,
        role: account.role,
        email: account.email
      };
      console.log('Setting current user:', user);
      setCurrentUser(user);
      localStorage.setItem('adminUser', JSON.stringify(user));
      return true;
    }
    
    console.log('Login failed: No matching account found');
    return false;
  };

  const logout = () => {
    if (BYPASS_ADMIN) {
      setCurrentUser(DUMMY_ADMIN); // immediately restore
      localStorage.setItem('adminUser', JSON.stringify(DUMMY_ADMIN));
    } else {
      setCurrentUser(null);
      localStorage.removeItem('adminUser');
    }
  };

  const value = {
    currentUser,
    login,
    logout,
  isAuthenticated: !!currentUser || BYPASS_ADMIN,
  isRootAdmin: currentUser?.role === 'root' || BYPASS_ADMIN
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within AdminAuthProvider');
  }
  return context;
};
