import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { obtenerIdUsuario, obtenerIdPaciente } from '../../utils/userInfo';
import { getAllHistorialByUser } from '../../service/historialService';


const Historial = ({navigation}) => {

  const [medicaments, setMedicaments] = useState([]);


  const obtenerMedicamentos = async () => {
    try{
    const userId = await obtenerIdUsuario() || obtenerIdPaciente();
    const medicamentsResponse = await getAllHistorialByUser(userId);

    if (medicamentsResponse.success) {
      const { historial } = medicamentsResponse;
      console.log("cargando medicamentos", historial);
      setMedicaments(historial.historial);
    } else {
      console.log("Error al obtener medicamentos:", medicamentsResponse.error);
      // Puedes manejar el error de alguna manera, mostrar un mensaje, etc.
      setMedicaments([]);
    }
  } catch (error) {
    console.error("Error al obtener medicamentos:", error.message);
    setMedicaments([]);
  }
}

  useEffect(() => {
    obtenerMedicamentos();
  }, []);



  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.medicamentButton}
      >
      <Text style={styles.medicamentName}>{item.Name}</Text>
      <Text style={styles.medicamentDose}>{item.Date}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={medicaments}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Change flexDirection to 'column'
    justifyContent: 'center', // Adjust justifyContent if needed
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  medicamentButton: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '47%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  medicamentImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  medicamentName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  medicamentDose: {
    fontSize: 16,
    marginBottom: 5,
  },
  medicamentIndications: {
    fontSize: 14,
    textAlign: 'center',
  },
  roundButton: {
    backgroundColor: '#146D9F',
    borderRadius: 20, 
    padding: 10,
    width: 280,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default Historial;
