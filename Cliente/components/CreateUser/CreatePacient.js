import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Logo from '../../resources/Logo2.png';
import { findByMailandUpdate } from '../../service/userService';
import { obtenerIdUsuario } from '../../utils/userInfo';

function CreatePacient({ navigation }) {
  const [mail, setMail] = useState('');

  const navigateCreateUser = async () => {
    navigation.navigate('CreateUser');
  }

  const handleCreatePacient = async () => {

    const Cuidador = await obtenerIdUsuario();
   
    const result = await findByMailandUpdate(mail, Cuidador);
    console.log("el resultado es", result);
    if(!result){
      alert("Usuario no encontrado");
      return;
    }
    else{
      Alert.alert("Guardado", "El usuario se guardo con exito!", [{ text: "Listo" }], {
        cancelable: true,
      });
      navigation.navigate('MenuCarer');
    }

    
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.roundImage} />
      <Text style={styles.signInWithText}>Asignar Paciente</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={mail}
        onChangeText={text => setMail(text)}
      />
      

      <TouchableOpacity
        style={styles.roundButton} // Agrega el estilo de botón redondo
        onPress={handleCreatePacient}
      >
        <Text style={styles.buttonText}>Asignar Paciente</Text>
        
      </TouchableOpacity>


      <Text style={styles.changePasswordLink} onPress={navigateCreateUser} >¿No tiene una cuenta? Registralo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  roundImage: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 10,
    marginTop: 40,
  },
  input: {
    width: 280,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  roundButton: {
    borderRadius: 20, // Aplica un borde redondo al botón
  },
  changePasswordLink: {
    color: 'blue',
    marginBottom: 10,
    paddingTop: 30,
  },
  signInWithText: {
    marginTop: 40,
    paddingBottom: 30,
    fontSize: 20,
  },
  roundButton: {
    backgroundColor: '#146D9F',
    borderRadius: 20, // Aplica un borde redondo al botón
    padding: 10,
    width: 280,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  signInWithGoogle: {
    flexDirection: 'row', // Alinea elementos en fila horizontal
    alignItems: 'center', // Centra verticalmente
    paddingBottom: 30,
  },
  googleIcon: {
    width: 30,
    height: 30,
    marginTop: 30,
    marginBottom: 30,
  },
  googleText: {
    marginLeft: 5,
    
  },
});

export default CreatePacient;
