import React from 'react';
import lunes from '../../resources/LUNES.png';
import martes from '../../resources/MARTES.png';
import miercoles from '../../resources/MIERCOLES.png';
import jueves from '../../resources/JUEVES.png';
import viernes from '../../resources/VIERNES.png';
import sabado from '../../resources/SABADO.png';
import domingo from '../../resources/DOMINGO.png';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';


const OrganizeMedications = ({navigation}) => {


    const navigateViewMedications = (day) => {
        navigation.navigate('ViewMedications', { selectedDay: day });
    }


  return (
    <ScrollView>

    <View style={styles.container}>
       
      <TouchableOpacity style={[styles.button, { backgroundColor: '#fabfb7' }]} onPress={() => navigateViewMedications('L')} >
        <Image source={lunes} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#fdf9c4' }]} onPress={() => navigateViewMedications('M')}>
        <Image source={martes} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#ffda9e' }]} onPress={() => navigateViewMedications('X')}>
        <Image source={miercoles} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#a2edce' }]}  onPress={() => navigateViewMedications('J')}>
        <Image source={jueves} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#b2e2f2' }]} onPress={() => navigateViewMedications('V')}>
        <Image source={viernes} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#b0c2f2' }]} onPress={() => navigateViewMedications('S')}>
        <Image source={sabado} style={styles.icon} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: '#fabfb7' }]} onPress={() => navigateViewMedications('D')}>
        <Image source={domingo} style={styles.icon} />
      </TouchableOpacity>


    </View>
    </ScrollView>
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
    width: 120,
    height: 120,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default OrganizeMedications;
