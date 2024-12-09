import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { getDoctorsBySpecialty } from '../../services/appointment/appointmentAPI'; 
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function ChooseDoctor({ route, navigation }) {
    const { specialtyId, specialtyName, patientId } = route.params;
    const [doctors, setDoctors] = useState([]);
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await getDoctorsBySpecialty(specialtyId);
          if (response.Data) {
            const doctorsData = response.Data;
  
            if (doctorsData.length > 0) {
              setDoctors(doctorsData);
            } else {
              Alert.alert('Error', 'No se encontraron doctores para esta especialidad.');
            }
          } else {
            Alert.alert('Error', 'La respuesta de la API no contiene los doctores esperados o están mal formateados.');
          }
        } catch (error) {
          Alert.alert('Error', error.message || 'No se pudieron cargar los doctores.');
        }
      };
  
      if (specialtyId) {
        fetchDoctors();
      }
    }, [specialtyId]);
  
    const handleDoctorSelect = (doctor) => {
      navigation.navigate('BookAppointment', {
        doctorId: doctor.id,
        doctorName: `${doctor.firstName} ${doctor.lastName}`,
        specialtyName,
        patientId,
      });
    };
  
    return (
      <View style={styles.container}>
        {/* Back Button */}
        <TouchableOpacity 
          onPress={() => navigation.navigate('ChooseSpecialty')}
          style={styles.backButton}
        >
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#2260ff" />
        </TouchableOpacity>

        <Text style={styles.title}>Doctores de {specialtyName}</Text>

        <Text style={styles.subtitle}>Seleccione el doctor</Text>

        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {doctors.length > 0 ? (
            doctors.map((doctor, index) => (
              <TouchableOpacity
                key={index}
                style={styles.doctorButton}
                onPress={() => handleDoctorSelect(doctor)}
              >
                <Text style={styles.doctorText}>{doctor.firstName} {doctor.lastName}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noDoctorText}>No hay doctores disponibles para esta especialidad.</Text>
          )}
        </ScrollView>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignSelf: 'center',
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#ffffff',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 20,
    fontSize: 24,
    textAlign: 'center',
    color: '#2260ff',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#2260ff',
    marginBottom: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
  doctorButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ecf1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
  },
  noDoctorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
    textAlign: 'center',
    marginTop: 20,
  },
});
