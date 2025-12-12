import { useCallback, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

interface PurchaseHistoryItem {
  reservation_id: string;
  eventId: string;
  eventName: string;
  qty: number;
  type: string;
  totalAmount: number;
  buyerName: string;
  buyerEmail: string;
  date: string;
}

export default function History() {
  const [history, setHistory] = useState<PurchaseHistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      const load = async () => {
        try {
          const json = await AsyncStorage.getItem('purchaseHistory');
          const data: PurchaseHistoryItem[] = json ? JSON.parse(json) : [];
          setHistory(data);
        } catch (err) {
          console.log('Error cargando historial:', err);
        }
      };
      load();
    }, [])
  );

  return (
    <ScrollView className="px-5 pt-5" contentContainerStyle={{ paddingBottom: 40 }}>
      <Text className="mb-5 text-2xl font-bold">Historial de Compras</Text>

      {history.length === 0 ? (
        <Text className="opacity-60">No hay compras registradas.</Text>
      ) : (
        history
          .slice()
          .reverse() 
          .map((p, index) => (
            <View key={index} className="mb-4 rounded-xl border border-gray-300 bg-white p-4">
              <Text className="mb-2 text-lg font-bold">
                Compra #{index + 1}
              </Text>

              <Text className="text-base">ID: {p.reservation_id}</Text>
              <Text className="text-base">Evento: {p.eventName}</Text>
              <Text className="text-base">Cantidad: {p.qty}</Text>
              <Text className="text-base">Tipo: {p.type}</Text>
              <Text className="text-base">
                Total: ${p.totalAmount.toLocaleString('es-CL')}
              </Text>
              <Text className="text-base">Comprador: {p.buyerName}</Text>
              <Text className="text-base">Correo: {p.buyerEmail}</Text>
              <Text className="text-base">Fecha: {p.date}</Text>
            </View>
          ))
      )}
    </ScrollView>
  );
}
