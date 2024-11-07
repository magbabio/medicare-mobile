import { API_URL } from '../config';
import http from './http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Base64 from 'react-native-base64';


export const loginRequest = async (credentials) => {
  try {
    const response = await http.post('/user/login', credentials);
    const token = response.data.Data.token;

    if (token) {
      await AsyncStorage.setItem('token', token);
    }

    return response.data;
  } catch (error) {
    console.error("Error en la solicitud de inicio de sesión", error);
    throw error;
  }
};

// Decodificar el payload del token JWT manualmente
const decodeJWT = (token) => {
    try {
      // Asegurémonos de que el token tiene al menos dos partes (header y payload)
      if (token.split('.').length !== 3) {
        console.error("Token JWT no tiene el formato correcto.");
        return null;
      }
  
      // Extraemos la parte del payload del token (la segunda parte)
      const base64Url = token.split('.')[1];
      
      // Reemplazamos caracteres de base64 URL para convertirlo en base64 estándar
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      
      // Verificamos que la cadena base64 sea válida y tenga el formato adecuado
      const padding = base64.length % 4; // Asegurarnos de que la longitud sea múltiplo de 4
      if (padding) {
        const padLength = 4 - padding;
        base64 += '='.repeat(padLength); // Agregar relleno (=) si es necesario
      }
  
      // Decodificamos el payload usando Base64.decode
      const decodedPayload = JSON.parse(Base64.decode(base64));
      console.log(decodedPayload); // Para depurar y ver el contenido del payload
      return decodedPayload;
    } catch (error) {
      console.error("Error al decodificar el token manualmente", error);
      return null;
    }
  };

// Verificar el rol desde el token decodificado
export const getRoleFromToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) return null;

    // Decodificar el token usando la función manual
    const payload = decodeJWT(token);
    return payload?.role; // Devuelve el rol ('patient' o 'doctor')
  } catch (error) {
    console.error("Error al obtener el rol del token", error);
    return null;
  }
};
