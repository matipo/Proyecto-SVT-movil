import axios, { AxiosInstance } from 'axios';
import { API_URL } from './events';

//Interface
import { EventData } from 'types/event';
import { ReservationPayload, ReservationResponse } from 'types/reservation';

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

//Funcion para crear una reservacion
export const postReservation = async (payload: ReservationPayload) => {
  try {
    const response = await api.post<ReservationResponse>('/reservations', payload);

    console.log(`✅ Reserva creada para el evento ID: ${payload.event_id}`);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data;

      console.error('Error en la reserva:', responseData);

      const apiErrorMessage =
        responseData.detail || responseData.message || 'Error desconocido al reservar.';

      throw new Error(apiErrorMessage);
    } else {
      console.error('Error inesperado:', error);
      throw new Error('Error de red o configuración inesperado.');
    }
  }
};

export const getTicketPrice = async (
  eventId: string,
  ticketType: string
): Promise<number | null> => {
  try {
    const event = await getEventId(eventId);

    if (!event || !event.tickets) {
      console.warn(`Evento o tickets no encontrados para el ID: ${eventId}`);
      return null;
    }

    const ticket = event.tickets.find((t) => t.type === ticketType);

    if (ticket) {
      return ticket.price;
    } else {
      console.warn(`Tipo de ticket "${ticketType}" no encontrado para el evento ID: ${eventId}`);
      return null;
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 404) {
      console.error(`Evento con ID ${eventId} no encontrado.`);
    } else {
      console.error('Error al obtener el precio del ticket:', error);
    }
    throw new Error('No se pudo obtener el precio del ticket.');
  }
};
export const postCheckout = async (
  reservationId: string,
  buyer: { name: string; email: string }
) => {
  try {
    const response = await api.post('/checkout', {
      reservation_id: reservationId,
      buyer,
    });

    console.log(`✅ Checkout confirmado para reserva: ${reservationId}`);

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response) {
      const msg =
        error.response.data.detail ||
        error.response.data.message ||
        'Error al confirmar el checkout.';
      console.error('Error en checkout:', msg);
      throw new Error(msg);
    } else {
      console.error('Error inesperado en checkout:', error);
      throw new Error('Error de red o inesperado al hacer checkout.');
    }
  }
};

