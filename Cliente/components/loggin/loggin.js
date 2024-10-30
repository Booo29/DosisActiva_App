import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Logo from '../../resources/Logo2.png';
import { loginUser } from '../../service/userService';
import SuccessLoginModal from '../Alerts/AlertLogin';
import { guardarNombreUsuario, guardarIdUsuario } from '../../utils/userInfo';

function Login({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const navigateCreateUser = async () => {
    navigation.navigate('CreateUser');
  }

  const handleLogin = async () => {
    try {
        const data = await loginUser(name, password);
        if(!data){
          alert("Usuario o contraseña incorrectos");
          return;
        }
        else{
          console.log(data.user);
          await guardarNombreUsuario(data.user.FullName);
          await guardarIdUsuario(data.user._id);
          setSuccessModalVisible(true);
          
          if(data.user.Rol == "Paciente"){
            navigation.navigate('MenuScreen');
          }
          else if(data.user.Rol == "Cuidadora"){
            navigation.navigate('MenuCarer');
          }else if(data.user.Rol == "Ambos"){
            navigation.navigate('MenuAmbos');
          }
        }
        

      } catch (error) {
        // Maneja errores de la solicitud
        console.error(error);
      }
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.roundImage} />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={text => setPassword(text)}
      />

      <TouchableOpacity
        style={styles.roundButton} // Agrega el estilo de botón redondo
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
        
      </TouchableOpacity>


      <Text style={styles.changePasswordLink} onPress={navigateCreateUser} >¿No tiene una cuenta? Regístrese</Text>
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
    marginTop: 40,
    marginBottom: 40,

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
    marginTop: 50,
  },
  signInWithText: {
    marginTop: 40,
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

export default Login;
