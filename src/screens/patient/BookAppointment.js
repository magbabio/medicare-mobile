import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getAvailableDaysForDoctor, getAvailableTimeSlotsForDay, bookAppointment } from '../../services/appointment/appointmentAPI';

export default function BookAppointment({ route, navigation }) {
  const { doctorId, doctorName, specialtyName, patientId } = route.params;

  const [availableDays, setAvailableDays] = useState({});
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [apptReason, setApptReason] = useState('');

  useEffect(() => {
    const fetchAvailableDays = async () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      try {
        const response = await getAvailableDaysForDoctor(doctorId, month, year);
        const days = response.Data.reduce((acc, day) => {
          acc[day] = { marked: true, dotColor: '#2260ff' };
          return acc;
        }, {});
        setAvailableDays(days);
      } catch (error) {
        Alert.alert('Error', error.message || 'No se pudieron cargar los días disponibles.');
      }
    };

    if (doctorId) {
      fetchAvailableDays();
    }
  }, [doctorId]);

  const handleDaySelect = async (day) => {
    setSelectedDay(day.dateString);
    setSelectedSlot(null);
    try {
      const response = await getAvailableTimeSlotsForDay(doctorId, day.dateString);
      setAvailableSlots(response.Data);
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudieron cargar los horarios disponibles.');
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedSlot || !apptReason) {
      Alert.alert('Error', 'Por favor, selecciona un horario y proporciona el motivo de la consulta.');
      return;
    }

    try {
      console.log('datos', doctorId, patientId, selectedDay, selectedSlot, apptReason);
      const response = await bookAppointment(doctorId, patientId, selectedDay, selectedSlot, apptReason);
      console.log('book appointment', response);
      Alert.alert('Cita agendada', 'La cita ha sido agendada exitosamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', error.message || 'No se pudo agendar la cita.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón para volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Agendar Cita con {doctorName}</Text>
      <Text style={styles.subtitle}>Especialidad: {specialtyName}</Text>

      {/* Calendario para seleccionar días */}
      <Text style={styles.label}>Selecciona un día:</Text>
      <Calendar
        onDayPress={handleDaySelect}
        markedDates={{
          ...availableDays,
          [selectedDay]: { selected: true, selectedColor: '#2260ff' },
        }}
        theme={{
          todayTextColor: '#2260ff',
          arrowColor: '#2260ff',
          selectedDayBackgroundColor: '#2260ff',
          textDayFontWeight: 'bold',
          textMonthFontWeight: 'bold',
        }}
        style={styles.calendar}
      />

      {/* Selección de horarios */}
      {selectedDay && (
        <>
          <Text style={styles.label}>Selecciona un horario:</Text>
          <ScrollView horizontal style={styles.timeSlotContainer}>
            {availableSlots.length > 0 ? (
              availableSlots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.slotButton, selectedSlot === slot && styles.selectedSlot]}
                  onPress={() => setSelectedSlot(slot)}
                >
                  <Text
                    style={[
                      styles.slotText,
                      selectedSlot === slot && styles.selectedSlotText, // Cambiar color del texto cuando está seleccionado
                    ]}
                  >
                    {slot}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noDataText}>No hay horarios disponibles para este día.</Text>
            )}
          </ScrollView>
        </>
      )}

      {/* Motivo de la consulta */}
      <Text style={styles.label}>Motivo de la consulta:</Text>
      <TextInput
        style={styles.textArea}
        placeholder="Escribe el motivo de la consulta"
        multiline={true}
        value={apptReason}
        onChangeText={setApptReason}
      />

      {/* Botón para agendar la cita */}
      <TouchableOpacity
        style={[styles.bookButton, (!selectedSlot || !apptReason) && styles.bookButtonDisabled]}
        onPress={handleBookAppointment}
        disabled={!selectedSlot || !apptReason}
      >
        <Text style={styles.bookButtonText}>Agendar Cita</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center', // Centrado en la pantalla
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 10,
    zIndex: 10,
  },
  backText: {
    fontSize: 24,
    color: '#2260ff',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2260ff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2260ff',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#2260ff',
    marginVertical: 10,
  },
  calendar: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
  },
  timeSlotContainer: {
    marginBottom: 20,
    maxWidth: '100%',
  },
  slotButton: {
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ecf1ff',
    borderWidth: 1,
    borderColor: '#2260ff',
  },
  selectedSlot: {
    backgroundColor: '#2260ff',
    borderColor: '#ffffff',
  },
  selectedSlotText: {
    color: '#ffffff', // Cambiar el color del texto a blanco cuando se selecciona
  },
  slotText: {
    fontSize: 16,
    color: '#2260ff',
  },
  noDataText: {
    fontSize: 16,
    color: '#2260ff',
    textAlign: 'center',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    borderColor: '#2260ff',
    marginBottom: 20,
    width: '100%',
  },
  bookButton: {
    backgroundColor: '#2260ff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%', // Asegura que el botón sea lo suficientemente grande
  },
  bookButtonDisabled: {
    backgroundColor: '#a3b4ff',
  },
  bookButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
