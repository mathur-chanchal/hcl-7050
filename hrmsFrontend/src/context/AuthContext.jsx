import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hrms_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('hrms_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('hrms_current_user');
    }
  }, [user]);

  const loginUser = (employeeData) => {
    setUser(employeeData);
    localStorage.setItem('hrms_current_user', JSON.stringify(employeeData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('hrms_current_user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser, logoutUser, loading, setLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
