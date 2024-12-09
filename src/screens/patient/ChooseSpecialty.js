import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { getSpecialties } from '../../services/appointment/appointmentAPI';

export default function ChooseSpecialty({ navigation }) {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const response = await getSpecialties(); 

        if (response.Data) {
          const specialtiesData = response.Data;

          if (specialtiesData.length > 0) {
            const specialtiesNames = specialtiesData.map(specialty => ({
              id: specialty.id,  
              name: specialty.name,
            }));

            setSpecialties(specialtiesNames);
          } else {
            Alert.alert('Error', 'No se encontraron especialidades.');
          }
        } else {
          Alert.alert('Error', 'La respuesta de la API no contiene las especialidades esperadas o están mal formateadas.');
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', error.message || 'No se pudieron cargar las especialidades.');
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('PatientDashboard')}
        style={styles.backButton}
      >
        <FontAwesomeIcon icon={faArrowLeft} size={24} color="#2260ff" />
      </TouchableOpacity>

      <Text style={styles.title}>Agendar cita</Text>

      <Text style={styles.subtitle}>Seleccione la especialidad</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {specialties.length > 0 ? (
          specialties.map((specialty, index) => (
            <TouchableOpacity
              key={index}
              style={styles.specialtyButton}
              onPress={() => {
                navigation.navigate('ChooseDoctor', { specialtyId: specialty.id, specialtyName: specialty.name });
              }}
            >
              <Text style={styles.specialtyText}>{specialty.name}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noSpecialtyText}>No hay especialidades disponibles.</Text>
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
  specialtyButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ecf1ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
  },
  noSpecialtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
    textAlign: 'center',
    marginTop: 20,
  },
});
