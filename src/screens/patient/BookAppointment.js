import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserMd, faCalendarAlt, faCalendarPlus, faClipboardList, faStar } from '@fortawesome/free-solid-svg-icons';

export default function BookAppointment({ navigation }) {
  const [loading, setLoading] = useState(true);

  const [nextAppointment] = useState({
    date: '2024-11-10',
    time: '10:30 AM',
    doctorName: 'Dr. Juan Pérez',
  });

  const [recommendedDoctors] = useState([
    { id: 1, name: 'Dr. Marta Sánchez', specialty: 'Cardiología', rating: 4.9 },
    { id: 2, name: 'Dr. Carlos López', specialty: 'Pediatría', rating: 4.8 },
    { id: 3, name: 'Dra. Isabel García', specialty: 'Dermatología', rating: 4.7 },
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard del Paciente</Text>

      {/* Botones de Acción */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon icon={faCalendarPlus} size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Hola</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon icon={faClipboardList} size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Mis Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesomeIcon icon={faStar} size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Calificar Citas</Text>
        </TouchableOpacity>
      </View>

      {/* Próxima Cita */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Próxima Cita</Text>
        {nextAppointment ? (
          <View style={styles.appointmentContainer}>
            <FontAwesomeIcon icon={faCalendarAlt} size={32} color="#2260ff" style={styles.icon} />
            <View>
              <Text style={styles.appointmentText}>Fecha: {nextAppointment.date}</Text>
              <Text style={styles.appointmentText}>Hora: {nextAppointment.time}</Text>
              <Text style={styles.appointmentText}>Doctor: {nextAppointment.doctorName}</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.noAppointmentText}>No tienes citas programadas</Text>
        )}
      </View>

      {/* Doctores Recomendados */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Doctores Recomendados</Text>
        {recommendedDoctors.length > 0 ? (
          <FlatList
            data={recommendedDoctors}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.doctorContainer}>
                <FontAwesomeIcon icon={faUserMd} size={32} color="#2260ff" style={styles.icon} />
                <View>
                  <Text style={styles.doctorName}>{item.name}</Text>
                  <Text style={styles.specialty}>{item.specialty}</Text>
                  <Text style={styles.rating}>Calificación: {item.rating} ⭐</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.noDoctorsText}>No hay doctores recomendados en este momento</Text>
        )}
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
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6580de',
    borderRadius: 8,
    paddingVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 5,
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
  },
  icon: {
    marginRight: 10,
  },
  appointmentText: {
    fontSize: 16,
    color: '#000000',
  },
  noAppointmentText: {
    fontSize: 16,
    color: '#999999',
  },
  doctorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
  },
  specialty: {
    fontSize: 16,
    color: '#666666',
  },
  rating: {
    fontSize: 16,
    color: '#666666',
  },
  noDoctorsText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
  },
});
