import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, StyleSheet, ScrollView, Platform, FlatList, Image } from 'react-native';
import { TimerPicker } from "react-native-timer-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Notifications from 'expo-notifications';
import { getAllMedicamentsByUser } from '../../service/medicamentService';
import { obtenerIdUsuario, obtenerIdPaciente } from '../../utils/userInfo';
import { createReminder} from '../../service/reminderService';
import { createHistorial} from '../../service/historialService';

const CreateReminder = ({navigation}) => {

  const [medications, setMedications] = useState([]);


  const [selectedTime, setSelectedTime] = useState(new Date());
  const [selectedDays, setSelectedDays] = useState([]);
  const [pillQuantity, setPillQuantity] = useState('');
  const [selectedMedication, setSelectedMedication] = useState(null);


  const obtenerMedicamentos = async () => {
    try{
    const userId = await obtenerIdUsuario() || obtenerIdPaciente();
    const medicamentsResponse = await getAllMedicamentsByUser(userId, "Activo");

    if (medicamentsResponse.success) {
      const { medicaments } = medicamentsResponse;
      console.log("cargando medicamentos", medicaments);
      setMedications(medicaments.medicaments);
    } else {
      console.log("Error al obtener medicamentos:", medicamentsResponse.error);
      // Puedes manejar el error de alguna manera, mostrar un mensaje, etc.
      setMedications([]);
    }
  } catch (error) {
    console.error("Error al obtener medicamentos:", error.message);
    setMedications([]);
  }
}

  useEffect(() => {
    obtenerMedicamentos();
  }, []);


  const handleDayToggle = (day) => {
    const updatedDays = selectedDays.includes(day)
      ? selectedDays.filter((selectedDay) => selectedDay !== day)
      : [...selectedDays, day];
    setSelectedDays(updatedDays);
  };

  const triggerNotifications = async (selectedTime, selectedDays, pillQuantity) => {

    const triggerSettings = {
      hour: selectedTime.getHours(),
      minute: selectedTime.getMinutes(),
      //second: selectedTime.getSeconds(),
      repeats: true,
    };

    if (Platform.OS === 'android') {
      triggerSettings.channelId = 'pill-reminder';
    }

    console.log('triggerSettings', triggerSettings);


    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de Pastillas',
          body: `Debes de tomar: ${pillQuantity} de ${selectedMedication.Name}`,
          data: { data: "goes here", repeats: true }
        },
        trigger: triggerSettings,
      });
    } catch (error) {
      console.error('Error al programar la notificación:', error.message);
    }
  };

  const handleMedicationSelect = (medication) => {
    setSelectedMedication(medication);
  };

  const navigateMenu = async () => {
    navigation.navigate('MenuScreen');
  }


  const handleSaveAlarm = async () => {
    triggerNotifications(selectedTime, selectedDays, pillQuantity);
    const userId = await obtenerIdUsuario() || obtenerIdPaciente();
    const save = await createReminder(selectedTime.getHours().toString(), selectedTime.getMinutes().toString(), selectedTime.getSeconds().toString(), true, selectedDays, pillQuantity, selectedMedication.Name, userId);
    if(save){
      const historial = await createHistorial(selectedMedication.Name, new Date(), userId);
      if(historial){ 
          Alert.alert("Guardado", "La alarma se guardo con exito!", [{ text: "Listo" }], {
          cancelable: true,
        });
      navigateMenu();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "#F1F1F1", alignItems: "center", justifyContent: "center" }}>
        <TimerPicker
          padWithNItems={2}
          onDurationChange={(duration) => {
            console.log("Duration", duration);
            selectedTime.setHours(duration.hours);
            selectedTime.setMinutes(duration.minutes);
            selectedTime.setSeconds(duration.seconds);
          }

          }

          LinearGradient={LinearGradient}
          styles={{

            pickerItem: {
              fontSize: 34,
            },
            pickerLabel: {
              fontSize: 32,
              marginTop: 0,
            },
            pickerContainer: {
              marginRight: 6,
            },
          }}
        />
      </View>


      <ScrollView>
        <View >
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

      <TextInput
        style={styles.input}
        placeholder="Cantidad de Pastillas"
        keyboardType="numeric"
        value={pillQuantity}
        onChangeText={(text) => setPillQuantity(text)}
      />

      <View style={styles.medicationsContainer}>
        <Text style={styles.label}>Medicamentos:</Text>
        <FlatList
          data={medications}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleMedicationSelect(item)}
              style={[
                styles.medicationItem,
                selectedMedication?._id === item._id && styles.selectedMedicationItem,
              ]}
            >
              <Image source={{ uri: item.Image }} style={styles.medicationImage} />
              <View style={styles.medicationTextContainer}>
                <Text style={styles.medicationName}>{item.Name}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.roundButton} 
        onPress={handleSaveAlarm}
      >
        <Text style={styles.buttonText}>Guardar Alarma</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 30,
  },
  textRepeatAlarm: {
    fontSize: 16,
    marginRight: 100,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 5,
    alignContent: 'center',
    alignItems: 'center',
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
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
  input: {
    width: 280,
    height: 40,
    borderRadius: 15,
    borderWidth: 1,
    marginTop: 30,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  timePickerButton: {
    backgroundColor: '#146D9F',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  timePickerButtonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  pickerSeparator: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  medicationsContainer: {
    marginTop: 20,

  },
  medicationItem: {
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 5,
  },
  medicationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  medicationTextContainer: {
    marginTop: 5, // Espacio entre la imagen y el texto
  },
  medicationName: {
    textAlign: 'center', // Alinea el texto al centro
  },
  selectedMedicationItem: {
    backgroundColor: 'lightblue', // Color para indicar que está seleccionado
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
   marginTop: 40,
  },

});

export default CreateReminder;
