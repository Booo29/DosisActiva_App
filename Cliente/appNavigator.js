import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Login from './components/loggin/loggin';
import MenuScreen from './components/Menu/Menu';
import MenuCarer from './components/Menu/MenuCarer';
import RegisterMedicament from './components/registerMedicament/registerMedicament';
import Medicaments from './components/Medicaments/Medicaments';
import CreateReminder from './components/CreateReminder/CreateReminder';
import CreateUser from './components/CreateUser/CreateUser';
import SearchPacient from './components/SearchPacient/SearchPacient';
import CreatePacient from './components/CreateUser/CreatePacient';
import OrganizeMedications from './components/OrganizeMedications/OrganizeMedications';
import ViewMedications from './components/OrganizeMedications/ViewMedications';
import MisMedicaments from './components/Medicaments/MisMedicaments';
import MenuAmbos from './components/Menu/MenuAmbos';
import Historial from './components/Historial/Historial';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Inicio de Sesión" component={Login} />
        <Stack.Screen name="MenuScreen" component={MenuScreen} />
        <Stack.Screen name="MenuCarer" component={MenuCarer} />
        <Stack.Screen name="RegisterMedicament" component={RegisterMedicament} />
        <Stack.Screen name="Medicaments" component={Medicaments} />
        <Stack.Screen name="CreateReminder" component={CreateReminder} />
        <Stack.Screen name="CreateUser" component={CreateUser} />
        <Stack.Screen name="SearchPacient" component={SearchPacient} />
        <Stack.Screen name="CreatePacient" component={CreatePacient} />
        <Stack.Screen name="OrganizeMedications" component={OrganizeMedications} />
        <Stack.Screen name="ViewMedications" component={ViewMedications} />
        <Stack.Screen name="MisMedicaments" component={MisMedicaments} />
        <Stack.Screen name="MenuAmbos" component={MenuAmbos} />
        <Stack.Screen name="Historial" component={Historial} />
        {/* Agrega más pantallas aquí */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
