import { getEventId } from '@/api/api';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

interface EventData {
  _id: string;
  name: string;
  image: string;
  date: string;
}

export default function EventPage() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  console.log(eventId);

  useEffect(() => {
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        const response = await getEventId(eventId as string);
        setEvent(response);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#DC2626" />
        <Text className="mt-2 text-gray-500">Cargando eventos</Text>
      </View>
    );
  }
  return (
    <View>
      <View></View>
      <Text>{event?.name}</Text>
    </View>
  );
}
