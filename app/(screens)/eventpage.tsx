import { getEventId } from '@/api/api';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';

import { CalendarIcon, LocationIcon, ClockIcon } from 'components/Icons';

//Interface
import { EventData } from 'types/event';
import PurchaseTickets from 'components/PurchaseTickets';

export default function EventPage() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    <View className="flex-1 bg-white">
      <View className="h-[250px] w-full bg-gray-200">
        <Image
          source={{ uri: event?.image || 'https://placehold.co/600x400/png' }}
          className="h-full w-full object-cover"
        />
      </View>

      <View className="p-4">
        <Text className="mb-4 text-3xl font-bold text-gray-900">{event?.name}</Text>

        <View className="flex-row flex-wrap">
          <View className="mb-3 w-1/2 flex-row items-center pr-2">
            <CalendarIcon color="red" size={25} />
            <Text className="ml-2 text-base text-gray-600">
              {event?.date ? new Date(event.date).toLocaleDateString() : 'N/A'}
            </Text>
          </View>

          <View className="mb-3 w-1/2 flex-row items-center pr-2">
            <ClockIcon color="red" size={25} />
            <Text className="ml-2 text-base text-gray-600">
              {event?.date ? new Date(event.date).toLocaleTimeString() : 'N/A'}
            </Text>
          </View>

          <View className="mb-3 w-1/2 flex-row items-center pr-2">
            <LocationIcon color="red" size={25} />
            <Text className="ml-2 text-base text-gray-600">{event?.location}</Text>
          </View>
        </View>
        <PurchaseTickets event={event} />
      </View>
    </View>
  );
}
