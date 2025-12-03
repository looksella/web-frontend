/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Al iniciar, intentar recuperar usuario usando access_token o refresh_token
    const initAuth = async () => {
      const access = localStorage.getItem('access_token');
      const refresh = localStorage.getItem('refresh_token');

      if (access) {
        try {
          const { data } = await authAPI.me();
          setUser(data);
          setLoading(false);
          return;
        } catch (e) {
          // Si me() falla, intentaremos refresh si existe
        }
      }

      if (refresh) {
        try {
          const { data } = await authAPI.refresh(refresh);
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          const { data: me } = await authAPI.me();
          setUser(me);
        } catch (e) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          setUser(null);
        }
      }

      setLoading(false);
    };

    initAuth();
  }, []);

 const login = async (email, password) => {
  try {
    const { data } = await authAPI.login({ email, password });

    const accessToken = data.access_token;
    const refreshToken = data.refresh_token;

    // Guardar ambos tokens
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);

    // Obtener info del usuario
    const { data: me } = await authAPI.me();
    setUser(me);

    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || 'Error al iniciar sesión' };
  }
};


  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
