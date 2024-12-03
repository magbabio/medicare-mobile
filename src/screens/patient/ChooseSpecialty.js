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
        console.log(response);

        // Verificar que response.data y response.data.Data existen
        if (response.Data) {
          // Acceder al array de especialidades dentro de Data
          const specialtiesData = response.Data;

          // Si hay especialidades, extraemos los nombres
          if (specialtiesData && specialtiesData.length > 0) {
            // Extraer los nombres de las especialidades
            const specialtiesNames = specialtiesData.map(specialty => specialty.name);

            setSpecialties(specialtiesNames); // Establecer los nombres de las especialidades
          } else {
            Alert.alert('Error', 'No se encontraron especialidades.');
          }
        } else {
          Alert.alert('Error', 'La respuesta de la API no contiene las especialidades esperadas.');
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

      {/* Title */}
      <Text style={styles.title}>Agendar cita</Text>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {specialties.length > 0 ? (
          specialties.map((specialty, index) => (
            <TouchableOpacity
              key={index}
              style={styles.specialtyButton}
              onPress={() => navigation.navigate('SpecialtyDetails', { specialtyName: specialty })}
            >
              <Text style={styles.specialtyText}>{specialty}</Text>
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
    width: '100%', // Ajustado para ocupar más espacio
    maxWidth: 500, // Limitar un máximo para evitar que sea demasiado ancho
    backgroundColor: '#ffffff', // Fondo blanco
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
  scrollViewContainer: {
    flexGrow: 1,
    marginTop: 20,
  },
  specialtyButton: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#ecf1ff', // Mantenido el color de fondo de los botones
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff', // Asegura que el texto sea legible
  },
  noSpecialtyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2260ff',
    textAlign: 'center',
    marginTop: 20,
  },
});
