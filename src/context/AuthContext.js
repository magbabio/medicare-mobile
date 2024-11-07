import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, getRoleFromToken } from '../services/authAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Cargar el token al iniciar la app
  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        const role = await getRoleFromToken();
        setUserRole(role);
      }
    };
    loadToken();
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const response = await loginRequest(credentials);
      const token = response.token;

      // Guardar el token y rol en el estado y AsyncStorage
      await AsyncStorage.setItem('token', token);
      setToken(token);

      const role = await getRoleFromToken();
      setUserRole(role);

      return true;
    } catch (error) {
      throw error; // Propagar el error para manejarlo en el componente
    }
  };

//   const handleLogout = async () => {
//     await logout();
//     setToken(null);
//     setUserRole(null);
//   };

  return (
    <AuthContext.Provider value={{ token, userRole, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
