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

export const getAvailableDaysForDoctor = async (doctorId, month, year) => {
    try {
      const response = await axios.get(
        `${API_URL}/appointment/availableDays?doctorId=${doctorId}&month=${month}&year=${year}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error al obtener los días disponibles.');
    }
  };
  
  export const getAvailableTimeSlotsForDay = async (doctorId, date) => {
    try {
      const response = await axios.get(
        `${API_URL}/appointment/availableTimeSlots?doctorId=${doctorId}&date=${date}`
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error al obtener los horarios disponibles.');
    }
  };
  
  export const bookAppointment = async (doctorId, patientId, date, timeSlot, apptReason) => {
    try {
      const response = await axios.post(`${API_URL}/appointment/bookAppointment`, {
        doctorId,
        patientId,
        date,
        timeSlot,
        apptReason,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error al agendar la cita.');
    }
  };


  // doctor
  
  export const getPendingAppointmentsForDoctor = async (doctorId) => {
    try {
      const response = await axios.get(`${API_URL}/appointment/pendingAppointments/${doctorId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error al obtener las citas pendientes.');
    }
  };

  export const getTodayAppointmentsForDoctor = async (doctorId) => {
    try {
      const response = await axios.get(`${API_URL}/appointment/getTodayAppts`, {
        params: { doctorId },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Error al obtener las citas de hoy.');
    }
  };