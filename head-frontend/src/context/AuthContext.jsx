import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }

  }, []);

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsAuth(true);
  };

  const logout = () => {
    setToken(null);
    setIsAuth(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isAuth, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
