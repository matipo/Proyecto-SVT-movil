import axios, { AxiosInstance } from 'axios';
import { API_URL } from './events';

interface EventData {
  _id: string;
  name: string;
  image: string;
  date: string;
}

//Asignacion y creacion de Instance para sincronizar con la API
const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

//Funcion de obtener todos los Eventos
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data.data;
};

//Funcion para obtener un evento por su ID
export const getEventId = async (id: string) => {
  const response = await api.get<EventData>(`/events/${id}`);
  return response.data;
};
