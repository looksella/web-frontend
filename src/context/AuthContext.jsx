/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if(token) setUser({ token });
    setLoading(false);
  }, []);

 const login = async (email, password) => {
  try {
    const { data } = await authAPI.login({ email, password });

    const accessToken = data.access_token; 

    localStorage.setItem('token', accessToken);
    setUser({ token: accessToken });

    return { success: true };
  } catch(err) {
    return { success: false, error: err.response?.data?.message || 'Error al iniciar sesión' };
  }
};


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
