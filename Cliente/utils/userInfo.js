import AsyncStorage from '@react-native-async-storage/async-storage';

// Para guardar el nombre del usuario
export async function guardarNombreUsuario(nombre) {
  try {
    await AsyncStorage.setItem('FullName', nombre);
  } catch (error) {
    console.error('Error al guardar el nombre del usuario:', error);
  }
}

// Para recuperar el nombre del usuario
export async function obtenerNombreUsuario() {
  try {
    const nombre = await AsyncStorage.getItem('FullName');
    return nombre;
  } catch (error) {
    console.error('Error al obtener el nombre del usuario:', error);
    return null;
  }
}

export async function guardarIdUsuario(id) {
    try {
        await AsyncStorage.setItem('_id', id);
    } catch (error) {
        console.error('Error al guardar el id del usuario:', error);
    }
}

export async function obtenerIdUsuario() {
    try {
        const id = await AsyncStorage.getItem('_id');
        return id;
    } catch (error) {
        console.error('Error al obtener el id del usuario:', error);
        return null;
    }
}

export async function guardarNombrePaciente(nombre) {
  try {
    await AsyncStorage.setItem('FullName', nombre);
  } catch (error) {
    console.error('Error al guardar el nombre del usuario:', error);
  }
}

// Para recuperar el nombre del usuario
export async function obtenerNombrePaciente() {
  try {
    const nombre = await AsyncStorage.getItem('FullName');
    return nombre;
  } catch (error) {
    console.error('Error al obtener el nombre del usuario:', error);
    return null;
  }
}

export async function guardarIdPaciente(id) {
    try {
        await AsyncStorage.setItem('_id', id);
    } catch (error) {
        console.error('Error al guardar el id del usuario:', error);
    }
}

export async function obtenerIdPaciente() {
    try {
        const id = await AsyncStorage.getItem('_id');
        return id;
    } catch (error) {
        console.error('Error al obtener el id del usuario:', error);
        return null;
    }
}