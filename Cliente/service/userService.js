import axios from 'axios';
const API_BASE_URL = 'http://192.168.31.9:8080/api/v1/user'; 

export const loginUser = async (name, password) => {
  try {
    console.log("username: ", name, "password: ", password);
    const {data} = await axios.get(`${API_BASE_URL}/findByNameAndPassword/${name}/${password}`);
    const user = data;
    console.log("el user es", user);
    return user;
    }
    catch (error) {
      throw new Error(error);
    }
};

export const registerUser = async (user) => {
  try {
    const {data} = await axios.post(`${API_BASE_URL}/registerUser`, user);
    const newUser = data;
    return newUser;
    }
    catch (error) {
      throw new Error(error);
    }
}

export const findByNameOrMail = async (dato) => {
  try {
    const encodedDato = encodeURIComponent(dato);
    const {data} = await axios.get(`${API_BASE_URL}/findByNameOrMail/${encodedDato}`);
    console.log("el data es", data);
    const user = data;
    return user;
    }
    catch (error) {
      throw new Error(error);
    }
}

export const findByMailandUpdate = async (mail, Cuidador) => {
  try {
    const {data} = await axios.put(`${API_BASE_URL}/findByMailandUpdate/${mail}`,{
      Cuidador,
    });
    console.log("el data es", data);
    const user = data;
    return user;
    }
    catch (error) {
      throw new Error(error);
    }
  }