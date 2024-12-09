import axios from 'axios';
//import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.103:4000/api';

const http = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});


http.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error al obtener el token de AsyncStorage", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
