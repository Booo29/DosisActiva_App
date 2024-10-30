import axios from 'axios';
const API_BASE_URL = 'http://192.168.31.9:8080/api/v1/medicament';

export const registerMedicament = async ( Name, Dose, Indications, Image, Days, Status, User) => {
   
    const ID = Math.floor(Math.random() * 1000);
    try {
        const {data} = await axios.post(`${API_BASE_URL}/createMedicament`, {
            ID,
            Name,
            Dose,
            Indications,
            Image,
            Days,
            Status,
            User
        });
        const medicament = data;
        return medicament;
        }
        catch (error) {
        throw new Error(error);
        }
}

export const getAllMedicamentsByUser = async (userId, status) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/getAllMedicamentsByUser/${userId}/${status}`);
        const medicaments = data;
        return {success: true, medicaments};
        }
        catch (error) {
            return {success: false, error: error.message};
        }
}

export const updateMedicament = async ( medicamentId, Name, Dose, Indications, Days, Image, Status) => {
    try {
        const {data} = await axios.put(`${API_BASE_URL}/updateMedicament/${medicamentId}`, {
            Name,
            Dose,
            Indications,
            Days,
            Image,
            Status,
        });
        const medicament = data;
        return medicament;
        }
        catch (error) {
        throw new Error(error);
        }
}

export const getAllMedicamentsByUserAndDays = async (userId, days, status) => {
    try {
        const {data} = await axios.get(`${API_BASE_URL}/getAllMedicamentsByUserAndDays/${userId}/${days}/${status}`);
        const medicaments = data;
        return {success: true, medicaments};
        }
        catch (error) {
            return {success: false, error: error.message};
        }
}