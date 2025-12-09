import { useEffect, useRef } from 'react';
import { Animated, View, Image, Text } from 'react-native';
import { Link } from 'expo-router';

export default function EventCard({ event }: { event: any }) {
  const DEFAULT_IMAGE_URL = 'https://placehold.co/600x300/png';
  const imageUrl = event.image && event.image !== '' ? event.image : DEFAULT_IMAGE_URL;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View style={{ opacity: fadeAnim }}>
        <Link
          href={{
            pathname: '/eventpage',
            params: { eventId: event._id },
          }}>
          <View className="w-[360px] rounded-md bg-white p-2 shadow-2xl">
            <Image
              source={{ uri: imageUrl }}
              className="h-[180px] w-full bg-gray-500 object-scale-down"
            />
            <Text className="mt-2 text-xl font-bold" numberOfLines={1} ellipsizeMode="tail">
              {event.name}
            </Text>
            <Text className="text-gray-600">{event.category}</Text>
            <Text className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString('es-CL', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>
          </View>
        </Link>
      </Animated.View>
    </View>
  );
}
