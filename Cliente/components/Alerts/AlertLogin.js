import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import Logo from '../../resources/logo.png';


const SuccessLoginModal = ({ isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isVisible, onClose]);

  return (
    <Modal isVisible={isVisible} style={{ margin: 0 }}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20, width: 300 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={Logo} style={{ width: 80, height: 80 }} />
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', marginVertical: 10 }}>¡Inicio de sesión exitoso!</Text>
        <Text style={{ textAlign: 'center', marginVertical: 10 }}>Bienvenido a la aplicación.</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={{ textAlign: 'center', color: 'blue', textDecorationLine: 'underline' }}>Cerrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
  );
};

export default SuccessLoginModal;
