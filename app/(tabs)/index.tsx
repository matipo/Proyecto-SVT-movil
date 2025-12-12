import { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Link } from 'expo-router';

import EventList from 'components/EventList';

export default function Index() {
  return (
    <View className="flex-1 space-y-4">
      <ScrollView>
        <EventList />
      </ScrollView>
    </View>
  );
}
