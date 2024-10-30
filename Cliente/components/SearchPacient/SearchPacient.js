import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import { findByNameOrMail } from '../../service/userService';
import { guardarNombrePaciente, guardarIdPaciente } from '../../utils/userInfo';

const SearchPacient = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleSearch = async () => {

    console.log("el dato ", search);
    const result = await findByNameOrMail(search);
    console.log("el resultado ", result.user[0].FullName);

    setSelectedPatient(result.user[0]);
  };

  const handleViewPatient = async () => {
    if (selectedPatient){
      await guardarNombrePaciente(selectedPatient.FullName);
      await guardarIdPaciente(selectedPatient._id);
      navigation.navigate('MenuScreen');
    }

  };

  const handleDeletePatient = () => {
    // Aquí deberías llamar a tu servicio para eliminar pacientes
    // y manejar la acción correspondiente.
    console.log('Eliminar paciente:', selectedPatient);
    // Luego de eliminar, puedes limpiar la información del paciente seleccionado.
    setSelectedPatient(null);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Buscar paciente..."
        onChangeText={setSearch}
        value={search}
        onSubmitEditing={handleSearch}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInput}
      />

      {selectedPatient ? (
        <View style={styles.patientInfoContainer}>
          <ListItem key={selectedPatient.id} bottomDivider>
            <ListItem.Content>
              <ListItem.Title>{selectedPatient.nombre}</ListItem.Title>
              <ListItem.Subtitle>{`Nombre: ${selectedPatient.FullName}`}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.roundButton} // Agrega el estilo de botón redondo
              onPress={handleViewPatient}
            >
              <Text style={styles.buttonText}>Ver Paciente</Text>

            </TouchableOpacity>

           
            <TouchableOpacity
              style={styles.roundButton} // Agrega el estilo de botón redondo
              onPress={handleDeletePatient}
            >
              <Text style={styles.buttonText}>Eliminar Paciente</Text>

            </TouchableOpacity>
          </View>

        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  searchBarInput: {
    backgroundColor: '#e1e1e1',
  },
  patientInfoContainer: {
    marginTop: 20,
  },
  buttonsContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roundButton: {
    backgroundColor: '#146D9F',
    borderRadius: 20, // Aplica un borde redondo al botón
    padding: 10,
    width: 150,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchPacient;
