import { useEffect, useRef } from 'react';
import { Animated, View, Image, Text } from 'react-native';
import { Link } from 'expo-router';

export default function EventCard({ event }: { event: any }) {
  const DEFAULT_IMAGE_URL = 'https://placehold.co/600x300/png';

  const imageUrl = event.image && event.image !== '' ? event.image : DEFAULT_IMAGE_URL;

  return (
    <View className="flex-1 items-center justify-center">
      <Link href={`/eventpage`}>
        <View className="flex-1 rounded-md bg-white p-2 shadow-2xl">
          <Image
            source={{ uri: imageUrl }}
            className="h-[180px] w-[330px] bg-gray-500 object-scale-down"
          />
          <Text className="text-xl font-bold">{event.name}</Text>
          <Text>{event.category}</Text>
          <Text>
            {new Date(event.date).toLocaleDateString('es-CL', {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Text>
        </View>
      </Link>
    </View>
  );
}
