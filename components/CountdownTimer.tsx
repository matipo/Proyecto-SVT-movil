import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

// --- Interfaz ---

interface CountdownTimerProps {
  expirationTime: string | null | undefined;
  onTimerEnd?: () => void;
}

// --- Lógica del Temporizador ---

const getRemainingSeconds = (expirationISOString: string | null | undefined): number => {
  if (!expirationISOString) return 0;

  const expirationDate = new Date(expirationISOString);
  const now = new Date();

  const differenceInMs = expirationDate.getTime() - now.getTime();

  return Math.max(0, Math.floor(differenceInMs / 1000));
};

export default function CountdownTimer({ expirationTime, onTimerEnd }: CountdownTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(() => getRemainingSeconds(expirationTime));

  useEffect(() => {
    setTotalSeconds(getRemainingSeconds(expirationTime));
  }, [expirationTime]);

  useEffect(() => {
    if (totalSeconds <= 0) {
      if (onTimerEnd) onTimerEnd();
      return;
    }

    const intervalId = setInterval(() => {
      setTotalSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [totalSeconds, onTimerEnd]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (totalSeconds <= 0) {
    return (
      <View className="items-center">
        <Text className="mb-2 text-lg font-bold text-red-600">Tiempo de Reserva Expirado</Text>
        <Text className="text-md text-gray-600">Por favor, vuelve a intentar la reserva.</Text>
      </View>
    );
  }

  // Formatea a "00"
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return (
    <View className="items-center">
      <Text className="mb-2 text-lg text-gray-600">Tu reserva temporal expira en:</Text>
      <View className="flex flex-row items-center space-x-3">
        {/* Minutos box */}
        <View className="w-20 items-center justify-center rounded-lg bg-gray-100 px-4 py-3">
          <Text className="text-3xl font-bold text-gray-800">{formattedMinutes}</Text>
          <Text className="mt-0.5 text-xs text-gray-500">MIN</Text>
        </View>

        {/* Separador : */}
        <Text className="text-3xl font-bold text-gray-800">:</Text>

        {/* Segundos box */}
        <View className="w-20 items-center justify-center rounded-lg bg-gray-100 px-4 py-3">
          <Text className="text-3xl font-bold text-gray-800">{formattedSeconds}</Text>
          <Text className="mt-0.5 text-xs text-gray-500">SEG</Text>
        </View>
      </View>
    </View>
  );
}
