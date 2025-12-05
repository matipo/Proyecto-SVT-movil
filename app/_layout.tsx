import React from 'react';
import { Stack, Link, usePathname } from 'expo-router';
import { View, Text } from 'react-native';
import { TicketIcon } from 'components/Icons';
import SearchBar from 'components/SearchBar';

import '../global.css';

export default function Layout() {
  const pathname = usePathname();
  const isRootScreen = pathname === '/' || pathname === '/index';

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: 'white' },
          headerTintColor: 'red',
          headerTitle: () => (
            <Link href="/">
              <Text className="text-2xl font-bold text-black ">TicketApp</Text>
            </Link>
          ),
          headerLeft: () => (
            <Link href="/">
              <TicketIcon color="red" />
            </Link>
          ),
          headerRight: () => (isRootScreen ? <SearchBar /> : <View />),
        }}
      />
    </View>
  );
}
