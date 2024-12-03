import { API_URL } from '../../config';
import axios from 'axios';
import http from '../http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Base64 from 'react-native-base64';


export const getDoctorsBySpecialty = async (specialtyId) => {
  try {
    const queryParams = specialtyId ? `?specialtyId=${specialtyId}` : '';
    const response = await axios.get(`${API_URL}/appointment/doctorsBySpecialty${queryParams}`);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error('Error al obtener la lista de doctores. Inténtalo de nuevo.');
    }
  }
};

export const getSpecialties = async () => {
    try {
      const response = await axios.get(`${API_URL}/appointment/getSpecialties`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Error al obtener la lista de especialidades. Inténtalo de nuevo.');
      }
    }
  };
