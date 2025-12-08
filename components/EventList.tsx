import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import EventCard from './EventCard';
import SearchBar from './SearchBar';  // <--- IMPORTAR
import { getEvents } from '@/src/api/api';

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

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);

      try {
        const response = await getEvents();
        setEvents(response);
        setFilteredEvents(response); // Inicialmente mostrar todo
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // 🔎 Función para filtrar
  const handleSearch = (text: string) => {
    const lower = text.toLowerCase();
    const filtered = events.filter((ev) =>
      ev.name.toLowerCase().includes(lower)
    );
    setFilteredEvents(filtered);
  };

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
      <SearchBar onSearch={handleSearch} /> 

      {filteredEvents.map((event) => (
        <EventCard key={event._id} event={event} />
      ))}
    </View>
  );
}
