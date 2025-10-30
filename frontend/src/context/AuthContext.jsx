import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('echosheild_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // In real app, this would call backend API
    // For demo, we'll store mock user data
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('echosheild_user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const signup = (email, password, name) => {
    // In real app, this would call backend API
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      joinedAt: new Date().toISOString()
    };
    
    localStorage.setItem('echosheild_user', JSON.stringify(user));
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('echosheild_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, signup, logout }}>
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
