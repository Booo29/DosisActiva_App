import axios from 'axios';
const API_BASE_URL = 'http://192.168.31.9:8080/api/v1/reminder';

export const createReminder = async (Hour, Minute, Second, Repeat, Days, Dose, MedicamentName, User) => {
       
    const ID = Math.floor(Math.random() * 1000);
    try {
        const {data} = await axios.post(`${API_BASE_URL}/createReminder`, {
        Hour,
        Minute,
        Second,
        Repeat,
        Days,
        Dose,
        MedicamentName,
        User,
        });
        const reminder = data;
        return reminder;
        }
        catch (error) {
        throw new Error(error);
        }
}