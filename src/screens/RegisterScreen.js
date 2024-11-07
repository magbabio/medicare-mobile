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
  Alert,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { registrationSchema } from '../schemas/PatientSchema';
import { createPatientRequest } from '../services/patient/patientAPI';

import z from 'zod';

export default function RegisterScreen({ navigation }) {
  const [cedula, setCedula] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    const formData = {
      cedula,
      firstName,
      lastName,
      gender,
      age,
      email,
      password,
      confirmPassword,
    };

    try {
      // Validar con el esquema de Zod
      registrationSchema.parse(formData);
      
      // Si pasa la validación, continúa con el registro
      const data = await createPatientRequest(formData);
      Alert.alert('Registro exitoso', 'Tu cuenta ha sido creada');
      navigation.navigate('SignInScreenPatient');
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Mostrar el primer mensaje de error encontrado
        Alert.alert('Error', error.errors[0].message);
      } else {
        Alert.alert('Error', 'Hubo un problema con el registro');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 50 })}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#2260ff" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.title}>Registrarse</Text>

        {/* Form Fields */}
        <View style={styles.formContainer}>
          <TextInputField label="Cédula" placeholder="Ingrese su cédula" value={cedula} onChangeText={setCedula} keyboardType="numeric" />
          <TextInputField label="Nombre" placeholder="Ingrese su nombre" value={firstName} onChangeText={setFirstName} />
          <TextInputField label="Apellido" placeholder="Ingrese su apellido" value={lastName} onChangeText={setLastName} />
          <TextInputField label="Género" placeholder="Ingrese su género" value={gender} onChangeText={setGender} />
          <TextInputField label="Edad" placeholder="Ingrese su edad" value={age} onChangeText={setAge} keyboardType="numeric" />
          <TextInputField label="Correo electrónico" placeholder="correo@gmail.com" value={email} onChangeText={setEmail} keyboardType="email-address" />
          
          <PasswordInputField label="Contraseña" value={password} onChangeText={setPassword} showPassword={showPassword} setShowPassword={setShowPassword} />
          <PasswordInputField label="Confirmar contraseña" value={confirmPassword} onChangeText={setConfirmPassword} showPassword={showConfirmPassword} setShowPassword={setShowConfirmPassword} />

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Custom Components for TextInput and Password Input Fields
const TextInputField = ({ label, ...props }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <TextInput style={styles.input} {...props} />
  </View>
);

const PasswordInputField = ({ label, value, onChangeText, showPassword, setShowPassword }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.passwordContainer}>
      <TextInput
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#809cff"
        secureTextEntry={!showPassword}
        value={value}
        onChangeText={onChangeText}
      />
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIconContainer}>
        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} color="black" size={20} />
      </TouchableOpacity>
    </View>
  </View>
);

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#2260ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  inputLabel: {
    fontWeight: 'bold',
    color: '#000000',
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    height: 50,
    backgroundColor: '#ecf1ff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#809cff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf1ff',
    borderRadius: 8,
  },
  eyeIconContainer: {
    position: 'absolute',
    right: 12,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#2260ff',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

