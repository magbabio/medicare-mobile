import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Platform,
  Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { loginRequest } from '../services/authAPI';
import { getRoleFromToken } from '../services/authAPI';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const credentials = { email, password };
      const data = await loginRequest(credentials);      
      // Obtener rol del usuario después del login
      const role = await getRoleFromToken();

      if (role === 'patient') {
        navigation.replace('PatientDashboard');
      } 
       else {
        Alert.alert('Por favor inicie sesión como doctor');
      }
    } catch (error) {
      console.log(error);
      Alert.alert(data.Data.Message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#FFFFFF' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#2260ff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={[styles.title, { color: '#2260ff', fontSize: 24, textAlign: 'center' }]}>
          Iniciar sesión
        </Text>

        {/* Subtitle and Paragraph */}
        <Text style={[styles.subtitle, { color: '#2260ff', fontSize: 22, textAlign: 'left', marginTop: 20 }]}>
          Bienvenido
        </Text>
        <Text style={[styles.paragraph, { color: '#000000', fontSize: 16, marginVertical: 10 }]}>
          ¡Bienvenido a Medicare! Simplifica tu atención médica y mantén tu salud bajo control con solo unos clics.
          ¡Comienza hoy y cuida de tu bienestar!
        </Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: '#000000', fontSize: 22 }]}>
            Correo electrónico
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: '#ecf1ff',
                borderRadius: 8,
                color: '#809cff',
                fontSize: 16,
                paddingHorizontal: 12,
              },
            ]}
            placeholder="correo@gmail.com"
            placeholderTextColor="#809cff"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.inputLabel, { color: '#000000', fontSize: 22 }]}>
            Contraseña
          </Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: '#ecf1ff',
                  borderRadius: 8,
                  color: '#809cff',
                  fontSize: 16,
                  paddingHorizontal: 12,
                },
              ]}
              placeholder="Contraseña"
              placeholderTextColor="#809cff"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIconContainer}
            >
              <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="black" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#2260ff', borderRadius: 8, paddingVertical: 12 }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: '#FFFFFF', fontSize: 18 }]}>Iniciar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={{ color: '#2260ff', fontSize: 16, textAlign: 'center', marginTop: 20 }}>
          ¿No tienes cuenta? <Text style={{ fontWeight: 'bold' }}>Regístrate</Text>
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
    padding: 20,
    maxWidth: 400, // Ancho máximo para simular el tamaño de pantalla de un móvil
    alignSelf: 'center', // Centra el contenido en pantallas más grandes
  },  
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
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
  },
  subtitle: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  paragraph: {
    marginVertical: 10,
    lineHeight: 20,
    textAlign: 'left',
  },
  inputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 50,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf1ff',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 12,
  },
  button: {
    marginTop: 30,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});