import axios from 'axios';
const API_BASE_URL = 'http://192.168.31.9:8080/api/v1/historial';

export const createHistorial = async (Name, Date, User) => {
    try {
        const {data} = await axios.post(`${API_BASE_URL}/createHistorial`, {
            Name,
            Date,
            User
        });
        const historial = data;
        return historial;
        }
        catch (error) {
        throw new Error(error);
        }
}

export const getAllHistorialByUser = async (userId, status) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/getAllHistorialByUser/${userId}`);
        const historial = data;
        return {success: true, historial};
        }
        catch (error) {
            return {success: false, error: error.message};
        }
}