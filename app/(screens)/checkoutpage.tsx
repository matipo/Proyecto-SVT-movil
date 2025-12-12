import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams, Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { getEventName } from '@/api/api';

export default function CheckoutPage() {
  const params = useLocalSearchParams();

  const [eventName, setEventName] = useState<string>('');

  const purchase = params.purchase
    ? JSON.parse(params.purchase as string)
    : null;

  useEffect(() => {
    if (!purchase) return;

    const loadAndSave = async () => {
      try {
        const json = await AsyncStorage.getItem('purchaseHistory');
        const history = json ? JSON.parse(json) : [];

        const id = purchase.event_name || purchase.event_id;

        
        const name = await getEventName(id);

        setEventName(name);

        const record = {
          reservation_id: purchase._id,
          eventId: id,
          eventName: name,
          qty: purchase.tickets?.length || 1,
          type: purchase.tickets?.[0]?.type || 'Invalida',
          totalAmount: purchase.total_price,
          buyerName: purchase.buyer?.name,
          buyerEmail: purchase.buyer?.email,
          date: new Date(purchase.confirmed_at).toLocaleString(),
        };

        
        const exists = history.some(
          (h: any) => h.reservation_id === record.reservation_id
        );
        if (exists) return;

        const updated = [record, ...history];
        await AsyncStorage.setItem('purchaseHistory', JSON.stringify(updated));
      } catch (err) {
        console.log('Error al guardar historial:', err);
      }
    };

    loadAndSave();
  }, [purchase]);

  if (!purchase) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-lg font-semibold text-red-500">
          No se encontró el comprobante.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-6">
      <Text className="mb-8 text-center text-3xl font-bold text-green-600">
        Compra Confirmada 
      </Text>

      <View className="mb-5">
        <Text className="font-semibold text-gray-500">ID de Compra:</Text>
        <Text className="text-lg text-black">{purchase._id}</Text>
      </View>

      <View className="mb-5">
        <Text className="font-semibold text-gray-500">Evento:</Text>
        <Text className="text-lg text-black">
          {eventName || 'Cargando...'}
        </Text>
      </View>

      <View className="mb-5">
        <Text className="font-semibold text-gray-500">Total Pagado:</Text>
        <Text className="text-2xl font-bold text-green-600">
          ${purchase.total_price.toLocaleString('es-CL')}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="mb-2 text-xl font-bold">Datos del Comprador</Text>

        <Text className="font-semibold text-gray-500">Nombre:</Text>
        <Text className="text-lg">{purchase.buyer?.name}</Text>

        <Text className="mt-3 font-semibold text-gray-500">Email:</Text>
        <Text className="text-lg">{purchase.buyer?.email}</Text>
      </View>

      <View className="mb-6">
        <Text className="mb-3 text-xl font-bold">Tickets Emitidos</Text>

        {purchase.tickets?.map((t: any, idx: any) => (
          <View
            key={idx}
            className="mb-3 rounded-xl border border-gray-200 bg-gray-100 p-4"
          >
            <Text className="text-base">Código: {t.code}</Text>
            <Text className="mt-1 text-base">Tipo: {t.type}</Text>
          </View>
        ))}
      </View>

      <View className="mb-6">
        <Text className="font-semibold text-gray-500">
          Fecha de Confirmación:
        </Text>
        <Text className="text-lg">
          {new Date(purchase.confirmed_at).toLocaleString()}
        </Text>
      </View>

      <Link href="/" className="mb-12 w-full rounded-xl bg-red-600 py-4">
        <Text className="text-center text-lg font-semibold text-white">
          Volver al Inicio
        </Text>
      </Link>
    </ScrollView>
  );
}
