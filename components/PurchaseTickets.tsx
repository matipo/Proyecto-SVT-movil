import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Link } from 'expo-router';

export default function PurchaseTickets({ event }: { event: any }) {
  const [count, setCount] = useState(1);

  const primerTicket = event.tickets && event.tickets.length > 0 ? event.tickets[0].type : '';

  interface Ticket {
    type: string;
    price: number;
  }

  const [ticketType, setTicketType] = useState(primerTicket);

  const selectedTicket = event.tickets.find((ticket: any) => ticket.type === ticketType);
  const price = selectedTicket ? selectedTicket.price : 0;
  const subtotal = price * count;
  const iva = subtotal * 0.19;

  const total = subtotal + iva;

  const handleIncrease = () => {
    if (count < 10) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const handleDecrease = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <View className="">
      <Text className="mb-4 text-2xl font-black">Comprar Entradas</Text>

      {/* --- Tipo de entrada --- */}
      <View>
        <Text className="text-md mb-1 font-semibold text-gray-600">Tipo de entrada</Text>
        <View className="flex flex-col rounded-lg bg-gray-200">
          <Picker
            selectedValue={ticketType}
            onValueChange={(itemValue: string) => setTicketType(itemValue)}
            style={{ height: 50, color: '#1f2937' }}
            itemStyle={{ height: 50 }}>
            {event.tickets.map((ticket: Ticket) => (
              <Picker.Item
                key={ticket.type}
                label={`${ticket.type} - $${new Intl.NumberFormat('es-CL').format(ticket.price)}`}
                value={ticket.type}
              />
            ))}
          </Picker>
        </View>
      </View>

      {/* --- Cantidad --- */}
      <View className="mt-6">
        <Text className="text-md mb-1 font-semibold text-gray-600">Cantidad</Text>

        <View className="w-full flex-row items-center gap-2">
          <Pressable
            onPress={handleDecrease}
            className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200">
            <Text className="text-xl">-</Text>
          </Pressable>

          <View className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200">
            <Text className="text-xl font-medium text-black">{count}</Text>
          </View>

          <Pressable
            onPress={handleIncrease}
            className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200">
            <Text className="text-xl">+</Text>
          </Pressable>
        </View>
      </View>

      {/* --- Resumen de Precios --- */}
      <View className="mt-6">
        <View className="mb-1 flex flex-row justify-between font-medium text-gray-600">
          <Text>Subtotal</Text>
          <Text>${new Intl.NumberFormat('es-CL').format(subtotal)}</Text>
        </View>
        <View className="mb-1 flex flex-row justify-between font-medium text-gray-600">
          <Text>IVA (19%)</Text>
          <Text>${new Intl.NumberFormat('es-CL').format(iva)}</Text>
        </View>
        <View className="mt-3 flex flex-row justify-between border-t border-gray-200 pt-3 text-2xl font-bold text-gray-900">
          <Text className="text-2xl font-bold text-gray-900">Total</Text>
          <Text className="text-2xl font-bold text-gray-900">
            ${new Intl.NumberFormat('es-CL').format(total)}
          </Text>
        </View>
      </View>
      <Link
        // Esta es la URL y los parámetros de navegación
        href={{
          pathname: '/reservationpage',
          params: { eventId: event._id, qty: count, type: ticketType },
        }}
        // Clase para el contenedor del enlace
        className="mt-4 flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 active:bg-red-700">
        <Text className="text-center text-lg font-bold text-white">Comprar Entradas</Text>
      </Link>
    </View>
  );
}
