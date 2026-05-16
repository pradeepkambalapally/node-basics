import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = async (username, password) => {
    const res = await api.post('/users/login', { username, password });
    const { token: t, message } = res.data;
    localStorage.setItem('token', t);
    localStorage.setItem('user', JSON.stringify({ username }));
    setToken(t);
    setUser({ username });
    return res.data;
  };

  const register = async (username, password) => {
    const res = await api.post('/users/register', { username, password });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
