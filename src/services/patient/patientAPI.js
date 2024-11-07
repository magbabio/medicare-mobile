import { API_URL } from '../../config';
import axios from 'axios';
import http from '../http';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Base64 from 'react-native-base64';


export const createPatientRequest = async (patientData) => {
    try {
      const response = await axios.post(`${API_URL}/patient/create`, patientData);
      console.log(response.data.Data.Message)
      console.log(response);
      return response.data;
    } catch (error) {
        console.log(error);

      // Manejo del error
      if (error.response && error.response.data) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Error al crear el paciente. Inténtalo de nuevo.');
      }
    }
  };