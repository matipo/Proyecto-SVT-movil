import axios, { AxiosInstance } from 'axios';
import { API_URL } from './events';

//Interface
import { EventData } from 'types/event';

const api: AxiosInstance = axios.create({
  baseURL: `${API_URL}`,
});

//Funcion de obtener todos los Eventos
export const getEvents = async () => {
  const res = await api.get('/events?page=1');
  const { data, total, limit } = res.data;

  let allEvents = [...data];

  const totalPages = Math.ceil(total / limit);

  for (let i = 2; i <= totalPages; i++) {
    const nextRes = await api.get(`/events?page=${i}`);
    allEvents = [...allEvents, ...nextRes.data.data];
  }

  return allEvents;
};

//Funcion para obtener un evento por su ID
export const getEventId = async (id: string) => {
  const response = await api.get<EventData>(`/events/${id}`);
  return response.data;
};
