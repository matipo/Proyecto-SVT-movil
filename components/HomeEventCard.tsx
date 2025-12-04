import { useEffect, useRef } from 'react';
import { Animated, View, Image, Text } from 'react-native';

export default function HomeEventCard({ event }: { event: any }) {

    return (
        <View>
            <Image source={{ uri: 'https://placehold.co/600x400?text=Imagen+no+disponible' }} />
            <Text>{event.name}</Text>
            <Text>{event.category}</Text>
        </View>
    );
}