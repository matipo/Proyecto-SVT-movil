import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import EventCard from './EventCard';
import { getEvents } from '@/api/api';

interface EventData {
    _id: string; 
    name: string;
    image: string;
    date: string;
}

export default function EventList() {
    const [events, setEvents] = useState<EventData[]>([]);


    useEffect(() => {
        //Funcion fetch
        const fetchEvents = async () => {
            try {
                const response = await getEvents();
                setEvents(response)
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, []);


    return (
        
            <View className='gap-4 pb-5'>

            {(events.map( (event) =>
                <EventCard key={event._id} event={event}/>
            ))}
            </View>
        
    );
}