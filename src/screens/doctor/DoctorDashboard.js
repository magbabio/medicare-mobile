import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faClipboardList, faUserMd, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { getTodayAppointmentsForDoctor } from '../../services/appointment/appointmentAPI';

export default function DoctorDashboard({ navigation }) {
  const [doctorName] = useState('Dr. Juan Pérez');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const doctorId = 1; // Replace with actual doctor ID
        const response = await getTodayAppointmentsForDoctor(doctorId);
        console.log(response);
        setAppointments(response.Data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, {doctorName}</Text>

      {/* Botones de Acción */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('AppointmentSchedule')}>
          <FontAwesomeIcon icon={faCalendarAlt} size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Agenda de Citas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('Reports')}>
          <FontAwesomeIcon icon={faClipboardList} size={24} color="#FFFFFF" />
          <Text style={styles.buttonText}>Reportes</Text>
        </TouchableOpacity>
      </View>

      {/* Citas de Hoy */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Tus citas de hoy</Text>
        <Text style={styles.dateText}>Lunes 9 de diciembre</Text>
        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : appointments.length > 0 ? (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.appointmentContainer}>
                <FontAwesomeIcon icon={faUserMd} size={24} color="#2260ff" style={styles.icon} />
                <View style={styles.appointmentDetails}>
                  <Text style={styles.appointmentText}>Hora: {item.timeSlot}</Text>
                  <Text style={styles.appointmentText}>Paciente: {item.patientName}</Text>
                </View>
                <TouchableOpacity style={styles.infoButton} onPress={() => navigation.navigate('AppointmentInfo', { appointmentId: item.id })}>
                  <FontAwesomeIcon icon={faInfoCircle} size={24} color="#2260ff" />
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noAppointmentsText}>No tienes citas programadas para hoy</Text>
        )}
      </View>
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
  },
  welcomeText: {
    fontSize: 20,
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
  dateText: {
    fontSize: 16,
    color: '#666666',
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
  appointmentDetails: {
    flex: 1,
  },
  appointmentText: {
    fontSize: 16,
    color: '#000000',
  },
  infoButton: {
    padding: 10,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
});