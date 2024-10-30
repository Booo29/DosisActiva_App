import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { registerMedicament, updateMedicament } from '../../service/medicamentService';
import { obtenerIdUsuario, obtenerIdPaciente } from '../../utils/userInfo';

const RegisterMedicament = ({ navigation, route }) => {

  const [nombre, setNombre] = useState('');
  const [dosis, setDosis] = useState('');
  const [indicaciones, setIndicaciones] = useState('');
  const [foto, setFoto] = useState('');
  const [prueba, setPrueba] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);

  useEffect(() => {
    const selectedMedicament = route.params.selectedMedicament || null;
    if (selectedMedicament) {
      setNombre(selectedMedicament.Name || '');
      setDosis(selectedMedicament.Dose || '');
      setIndicaciones(selectedMedicament.Indications || '');
      setSelectedDays(selectedMedicament.Days || []);
    }
  }, [route.params]);

  const navigateMenuMedicament = async () => {
    navigation.navigate('Medicaments');
  }

  const tomarFoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (!result.canceled) {
        setFoto(result);
        setPrueba(result.uri);
      }

    } catch (error) {
      console.log(error);
    }
  };



  const handleRegisterMedicament = async () => {
    try {
      const user = await obtenerIdUsuario() || obtenerIdPaciente();
      const status = "Activo"
      const selectedMedicament = route.params.selectedMedicament || null;

      if (selectedMedicament._id) {
        const medicamentId = selectedMedicament._id;
        const medicament = await updateMedicament(medicamentId, nombre, dosis, indicaciones, selectedDays, prueba, status);
        Alert.alert("Guardado", "El medicamento se guardo con exito!", [{ text: "Listo" }], {
          cancelable: true,
        });

      } else {
        
        const data = await registerMedicament(nombre, dosis, indicaciones, prueba, selectedDays, status, user);

        Alert.alert("Guardado", "El medicamento se guardo con exito!", [{ text: "Listo" }], {
          cancelable: true,
        });
        
      }

      navigateMenuMedicament();
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un error!", [{ text: "Listo" }], {
        cancelable: true,
      });
    }
  };

  const handleDeleteMedicament = async () => {
    try {
      const status = "Inactivo"
      const selectedMedicament = route.params.selectedMedicament || null;
      if(selectedMedicament._id){
        const medicamentId = selectedMedicament._id;
        const medicament = await updateMedicament(medicamentId, nombre, dosis, indicaciones, selectedDays, prueba, status);
        if(medicament){
          Alert.alert("Eliminado", "El medicamento se elimino con exito!", [{ text: "Listo" }], {
            cancelable: true,
          });
          navigateMenuMedicament();
        }
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Hubo un error!", [{ text: "Listo" }], {
        cancelable: true,
      });
    }
  };

  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];
    setSelectedDays(updatedDays);
  };



  return (
    <ScrollView >
      <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Medicamento"
        value={nombre}
        onChangeText={text => setNombre(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Dosis"
        value={dosis}
        onChangeText={text => setDosis(text)}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Indicaciones"
        value={indicaciones}
        multiline
        numberOfLines={4}
        onChangeText={text => setIndicaciones(text)}
      />

      <Text style={styles.label}>Días de la Semana</Text>
      <View style={styles.daysContainer}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => handleDayToggle(day)}
            style={[styles.dayButton, { backgroundColor: selectedDays.includes(day) ? 'green' : 'gray' }]}
          >
            <Text style={styles.dayButtonText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Foto del Medicamento</Text>


      <View style={styles.imageContainer}>
        {foto ? (
          <Image source={{ uri: foto.assets[0].uri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.text}>No hay imagen seleccionada</Text>
        )}
      </View>


      <TouchableOpacity
        style={styles.roundButton} // Agrega el estilo de botón redondo
        onPress={tomarFoto}
      >
        <Text style={styles.buttonText}>Tomar Foto</Text>

      </TouchableOpacity>

      <TouchableOpacity
        style={styles.roundButton} // Agrega el estilo de botón redondo
        onPress={handleRegisterMedicament}
      >
        <Text style={styles.buttonText}>Guardar Medicamento</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.roundButton, { backgroundColor: 'red' }]} // Agrega el estilo de botón redondo
        onPress={handleDeleteMedicament}
      >
        <Text style={styles.buttonText}>Eliminar Medicamento</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,

  },
  input: {
    width: 280,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  textArea: {
    width: 280,
    height: 80,
    borderRadius: 15,
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
  },
  previewImage: {
    width: 200,
    height: 200,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  roundButton: {
    backgroundColor: '#146D9F',
    borderRadius: 20,
    padding: 10,
    width: 280,
    marginBottom: 40,
  },
  imageContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignContent: 'center',
    textAlign: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingBottom: 20,
  },
  dayButton: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 100,
    marginRight: 5,
    width: 40,
  },
  dayButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default RegisterMedicament;
