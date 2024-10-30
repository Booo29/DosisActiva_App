import React from 'react';
import RegistrarPaciente from '../../resources/RegistrarPaciente.png';
import VerPaciente from '../../resources/VerPaciente.png';
import Salir from '../../resources/Salir.png';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';


const MenuCarer = ({navigation}) => {

  const navigateCreateUser = async () => {
    navigation.navigate('CreatePacient');
  }

  const navigateSearchPacient = async () => {
    navigation.navigate('SearchPacient');
  }


  return (
    
    <View style={styles.container}>
       
      <TouchableOpacity style={[styles.button, { backgroundColor: '#fabfb7' }]} onPress={navigateCreateUser} >
        <Image source={RegistrarPaciente} style={styles.icon} />
        <Text style={styles.text}>Registrar Paciente</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#fdf9c4' }]} onPress={navigateSearchPacient}>
        <Image source={VerPaciente} style={styles.icon} />
        <Text style={styles.text}>Ver Paciente</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  button: {
    width: 300,
    height: 170,

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default MenuCarer;
