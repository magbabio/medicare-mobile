import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StatusBar } from 'react-native';

import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from "./src/store";

import WelcomeScreen from './src/screens/WelcomeScreen';
import SignInScreenPatient from './src/screens/SignInScreenPatient';
import SignInScreenDoctor from './src/screens/SignInScreenDoctor';
import RegisterScreen from './src/screens/RegisterScreen';
import PatientDashboard from './src/screens/patient/PatientDashboard';
import DoctorDashboard from './src/screens/doctor/DoctorDashboard';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const BottomBarScreens = () => {
  return (
    <Tab.Navigator tabBar={() => <BottomBar />}
      screenOptions={{ headerShown: false }}>
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="SignInScreenPatient" component={SignInScreenPatient} />
              <Stack.Screen name="SignInScreenDoctor" component={SignInScreenDoctor} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen name="PatientDashboard" component={PatientDashboard} />
              <Stack.Screen name="DoctorDashboard" component={DoctorDashboard} />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;