import React, { useEffect } from 'react';
import { Stack, Link, usePathname, useRouter } from 'expo-router';
import { View, Text, Pressable } from 'react-native';
import { BackIcon, TicketIcon } from 'components/Icons';
import { SearchProvider } from '@/context/SearchContext';

import SearchBar from 'components/SearchBar';

import '../global.css';

export default function Layout() {
  const pathname = usePathname();
  const isRootScreen = pathname === '/' || pathname === '/index';
  const pathback = pathname != '/' && pathname != '/index';

  const router = useRouter();
  // Función para manejar el evento de retroceso
  const handleBackPress = () => {
    router.back();
  };

  return (
    <SearchProvider>
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
            headerLeft: () =>
              pathback ? (
                <Pressable onPress={handleBackPress}>
                  <BackIcon color="red" />
                </Pressable>
              ) : (
                <TicketIcon color="red" />
              ),
            headerRight: () => (isRootScreen ? <SearchBar /> : <View />), //Funcion para mostrar el icono de SearchBar en el path "/"
          }}
        />
      </View>
    </SearchProvider>
  );
}
