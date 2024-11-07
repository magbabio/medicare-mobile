import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';

export default function HomeScreen({ navigation }) {
  // Cargar la fuente Poppins
  const [fontsLoaded] = useFonts({
    Poppins: require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // Muestra un indicador de carga mientras se cargan las fuentes
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo */}
        <Image
          source={require('../assets/images/logo .png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Title */}
        <Text style={[styles.title, { color: '#2260ff', fontSize: 24, textAlign: 'center' }]}>
          Medicare
        </Text>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { color: '#2260ff', fontSize: 22, textAlign: 'center', marginTop: 20 }]}>
          Bienvenido
        </Text>

        {/* Botón para Paciente */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2260ff' }]}
          onPress={() => navigation.navigate('SignInScreenPatient')}
        >
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>
            Iniciar sesión como Paciente
          </Text>
        </TouchableOpacity>

        {/* Botón para Doctor */}
        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('SignInScreenDoctor')}
        >
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>
            Iniciar sesión como Doctor
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    marginTop: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#cad6ff',
    borderRadius: 20,
  },
  secondaryButtonText: {
    color: '#2260ff',
  },
});
