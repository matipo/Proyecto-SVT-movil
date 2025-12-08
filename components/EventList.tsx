import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useSearch } from '@/context/SearchContext';

import EventCard from './EventCard';
import { getEvents } from '../src/api/api';

interface EventData {
  _id: string;
  name: string;
  image: string;
  date: string;
}

export default function EventList() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { searchText } = useSearch();

  //Funcion fetch para obtener eventos
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await getEvents();
        setEvents(response);
        setFilteredEvents(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Función para filtrar
  useEffect(() => {
    if (!events.length) return;

    if (searchText === '') {
      setFilteredEvents(events);
    } else {
      const lower = searchText.toLowerCase();
      const filtered = events.filter((ev) => ev.name.toLowerCase().includes(lower));
      setFilteredEvents(filtered);
    }
  }, [searchText, events]);
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#DC2626" />
        <Text className="mt-2 text-gray-500">Cargando eventos</Text>
      </View>
    );
  }

  return (
    <View className="gap-4 pb-5 pt-3">
      {filteredEvents.length === 0 ? (
        <View className="flex-1 items-center justify-center py-10 opacity-70">
          <Text className="text-center text-lg font-semibold text-gray-500">
            No se encontraron eventos
          </Text>

          {searchText ? (
            <Text className="mt-2 text-center text-sm text-gray-400">
              No hay resultados para "{searchText}"
            </Text>
          ) : null}
        </View>
      ) : (
        filteredEvents.map((event) => <EventCard key={event._id} event={event} />)
      )}
    </View>
  );
}
