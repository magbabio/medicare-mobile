import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function DoctorDashboard() {
  // Datos simulados para las citas del día
  const [todayAppointments] = useState([
    { id: 1, patientName: 'Juan López', time: '10:00 AM', reason: 'Dolor de cabeza' },
    { id: 2, patientName: 'María Pérez', time: '11:30 AM', reason: 'Chequeo general' },
    { id: 3, patientName: 'Carlos García', time: '01:00 PM', reason: 'Consulta de seguimiento' },
    { id: 4, patientName: 'Ana Ramírez', time: '02:30 PM', reason: 'Control de presión' },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard del Doctor</Text>

      {/* Citas del día */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Citas de Hoy</Text>
        <FlatList
          data={todayAppointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointmentContainer}>
              <FontAwesomeIcon icon={faUser} size={32} color="#2260ff" style={styles.icon} />
              <View>
                <Text style={styles.patientName}>{item.patientName}</Text>
                <Text style={styles.appointmentTime}>Hora: {item.time}</Text>
                <Text style={styles.reason}>Motivo: {item.reason}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2260ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ecf1ff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2260ff',
    marginBottom: 10,
  },
  appointmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
  },
  appointmentTime: {
    fontSize: 16,
    color: '#000000',
  },
  reason: {
    fontSize: 16,
    color: '#666666',
  },
});
