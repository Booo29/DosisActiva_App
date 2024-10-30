import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DosisActiva from '../../resources/Logo2.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import {registerUser} from '../../service/userService';

const CreateUser = ({ navigation }) => {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [telefono, setTelefono] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
    const [direccion, setDireccion] = useState('');
    const [rol, setRol] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [fechaText, setFechaText] = useState('');
    const [isFocus, setIsFocus] = useState(false);

    const roles = [
        { label: 'Paciente', value: 'Paciente' },
        { label: 'Cuidadora', value: 'Cuidadora' },
        { label: 'Ambos', value: 'Ambos' },
    ];

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };

    const hideDatePickerModal = () => {
        setShowDatePicker(false);
    };


    const handleDateChange = (event, selectedDate) => {
        hideDatePickerModal();
        if (selectedDate) {
            setFechaNacimiento(selectedDate);
            const formattedDate = selectedDate.toLocaleDateString('es-ES'); // Formatea la fecha al estilo español
            setFechaText(formattedDate);
        }
    };

    const handleCreateUser = async () => {
        const user = {
            Mail:correo,
            Password: contrasena,
            FullName: nombre,
            Birthdate: fechaNacimiento,
            Address: direccion,
            Phone_Number: telefono,
            Rol: rol,
        };
        const registrar = await registerUser(user);

        if (registrar) {
            Alert.alert("Guardado", "El Usuario se guardo con exito!", [{ text: "Listo" }], {
                cancelable: true,
              });
            navigation.navigate('Inicio de Sesión');
         
        } else {
            Alert.alert("Error", "Error guardando el usuario!", [{ text: "Listo" }], {
                cancelable: true,
              });
        }
    };

    return (
        <View style={styles.container}>
            <Image source={DosisActiva} style={styles.roundImage} />
            <TextInput
                style={styles.input}
                placeholder="Correo"
                value={correo}
                onChangeText={text => setCorreo(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={contrasena}
                onChangeText={text => setContrasena(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Nombre Completo"
                value={nombre}
                onChangeText={text => setNombre(text)}
            />

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={roles}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Seleccione un Rol' : '...'}
                searchPlaceholder="Search..."
                value={rol}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setRol(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <AntDesign
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="Safety"
                        size={20}
                    />
                )}
            />



            <TextInput
                style={styles.input}
                placeholder="Número de Teléfono"
                keyboardType="phone-pad"
                value={telefono}
                onChangeText={text => setTelefono(text)}
            />

            <View style={styles.datePickerContainer}>
                <TextInput
                    style={styles.dateInput}
                    placeholder="Fecha de Nacimiento"
                    value={fechaText}
                    editable={false}
                />
                <TouchableOpacity style={styles.datePickerButton} onPress={showDatePickerModal}>
                    <Icon name="calendar" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={fechaNacimiento}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={handleDateChange}

                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Dirección"
                value={direccion}
                onChangeText={text => setDireccion(text)}
            />



            <TouchableOpacity
               style={styles.roundButton} // Agrega el estilo de botón redondo
               onPress={handleCreateUser}
            >
                <Text style={styles.buttonText}>Guardar Usuario</Text>

            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: "center",

    },
    roundImage: {
        width: 200,
        height: 200,

    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        width: 300,
    },
    datePickerContainer: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    dateInput: {
        width: 250,
        borderColor: 'gray',
        borderWidth: 1,
        marginRight: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    datePickerButton: {
        backgroundColor: '#146D9F',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        borderRadius: 20,
    },

    roundButton: {
        backgroundColor: '#146D9F',
        borderRadius: 20, 
        padding: 10,
        width: 280,
      },


    dropdown: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: 300,
        marginBottom: 15,
    },
    icon: {
        marginRight: 5,
    },
    labelCombo: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },





});



export default CreateUser;
