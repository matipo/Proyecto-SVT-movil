import { useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import SearchBar from 'components/SearchBar';

interface Event {
  id: number;
  name: string;
}

export default function EventsScreen() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);

  // Simulación de carga de datos (pueden venir de tu API)
  useEffect(() => {
    const mockEvents = [
      { id: 1, name: 'Concierto Rock' },
      { id: 2, name: 'Festival de Comida' },
      { id: 3, name: 'Feria Cultural' },
    ];

    setEvents(mockEvents);
    setFilteredEvents(mockEvents); // mostrar todo al inicio
  }, []);

  const handleSearch = (text: string) => {
    if (!text.trim()) {
      setFilteredEvents(events);
      return;
    }

    const results = events.filter((event) => event.name.toLowerCase().includes(text.toLowerCase()));

    setFilteredEvents(results);
  };

  return (
    <View className="flex-1 p-4">
      <SearchBar onSearch={handleSearch} />

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text className="p-2 text-lg">{item.name}</Text>}
      />
    </View>
  );
}
