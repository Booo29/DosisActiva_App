import React from 'react';
import CrearRecordatorio from '../../resources/CrearRecordatorio.png';
import OrganizarMedicamentos from '../../resources/OrganizarMedicamento.png';
import HistorialDosis from '../../resources/Historial.png';
import RegistrarMedicamento from '../../resources/RegistrarMedicamento.png';
import MisMedicamentos from '../../resources/MisMedicamentos.png';
import Salir from '../../resources/Salir.png';

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const MenuScreen = ({navigation}) => {

  const navigateCrearRecordatorio = async () => {
    navigation.navigate('Medicaments');
  }

  const navigateCreateReminder = async () => {
    navigation.navigate('CreateReminder');
  }

  const navigateOrganizeMedications = async () => {
    navigation.navigate('OrganizeMedications');
  }

  const navigateMisMedicamentos = async () => {
    navigation.navigate('MisMedicaments');
  }

  const navigateHistorial = async () => {
    navigation.navigate('Historial');
  }


  return (
    
    <View style={styles.container}>
       
      <TouchableOpacity style={[styles.button, { backgroundColor: '#fabfb7' }]} onPress={navigateCreateReminder} >
        <Image source={CrearRecordatorio} style={styles.icon} />
        <Text style={styles.text}>Crear Recordatorio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#fdf9c4' }]} onPress={navigateOrganizeMedications}>
        <Image source={OrganizarMedicamentos} style={styles.icon} />
        <Text style={styles.text}>Organizar Medicamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ffda9e' }]} onPress={navigateHistorial}>
        <Image source={HistorialDosis} style={styles.icon} />
        <Text style={styles.text}>Historial de Dosis</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#a2edce' }]} onPress={navigateCrearRecordatorio} >
        <Image source={RegistrarMedicamento} style={styles.icon} />
        <Text style={styles.text}>Registrar Medicamento</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#b2e2f2' }]} onPress={navigateMisMedicamentos}>
        <Image source={MisMedicamentos} style={styles.icon} />
        <Text style={styles.text}>Mis Medicamentos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#b0c2f2' }]}>
        <Image source={Salir} style={styles.icon} />
        <Text style={styles.text}>Salir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: '47%',
    height: 170,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 60,
    height: 60,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MenuScreen;
