import { useEffect, useRef } from 'react';
import { Animated, View, Image, Text } from 'react-native';

export default function EventCard({ event }: { event: any }) {

    const DEFAULT_IMAGE_URL = 'https://placehold.co/300x180/png';

    const imageUrl = (event.image && event.image !== '') 
        ? event.image 
        : DEFAULT_IMAGE_URL;



    return (
        <View className='flex 1 items-center justify-center'>
            <View className='bg-red-400'>
                <Image source={{ uri: imageUrl }} className='w-[300px] h-[180px] bg-gray-500 object-scale-down' />
                <Text className='font-bold text-xl'>{event.name}</Text>
                <Text>{event.category}</Text>
                <Text>{new Date(event.date).toLocaleDateString("es-CL", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
          })}</Text>
            </View>
        </View>
    );
}