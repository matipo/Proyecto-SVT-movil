import { View, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from "react-native-dropdown-picker";

export default function PurchaseTickets({ event }: { event: any }) {
  const [count, setCount] = useState(1);

  const primerTicket =
    event.tickets && event.tickets.length > 0 ? event.tickets[0].type : '';

  const [ticketType, setTicketType] = useState(primerTicket);

  const [open, setOpen] = useState(false);

  const [items, setItems] = useState(
    event.tickets.map((ticket: any) => ({
      label: `${ticket.type} - $${new Intl.NumberFormat("es-CL").format(ticket.price)}`,
      value: ticket.type,
    }))
  );

  const selectedTicket = event.tickets.find(
    (ticket: any) => ticket.type === ticketType
  );
  const price = selectedTicket ? selectedTicket.price : 0;
  const total = price * count;


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          paddingBottom: 40,
          paddingTop: 16,
        }}
      >

        <Text className="mb-4 text-2xl font-black">Comprar Entradas</Text>

        {/* --- Tipo de entrada --- */}
        <View style={{ zIndex: 2000 }}>
          <Text className="text-md mb-1 font-semibold text-gray-600">
            Tipo de entrada
          </Text>

          <DropDownPicker
            open={open}
            value={ticketType}
            items={items}
            setOpen={setOpen}
            setValue={setTicketType}
            setItems={setItems}
            style={{
              backgroundColor: "#e5e7eb",
              borderRadius: 10,
              borderColor: "#d1d5db",
            }}
            dropDownContainerStyle={{
              backgroundColor: "#f3f4f6",
              borderColor: "#d1d5db",
              zIndex: 3000,
            }}

            // 🔥 IMPORTANTE
            dropDownDirection="AUTO"
            listMode="SCROLLVIEW"
            listProps={{ nestedScrollEnabled: true }}
          />
        </View>

        {/* --- Cantidad --- */}
        <View style={{ marginTop: 40, zIndex: 1 }}>
          <Text className="text-md mb-1 font-semibold text-gray-600">
            Cantidad
          </Text>

          <View className="w-full flex-row items-center gap-2">
            <Pressable
              onPress={() => count > 1 && setCount(count - 1)}
              className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200"
            >
              <Text className="text-xl">-</Text>
            </Pressable>

            <View className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200">
              <Text className="text-xl font-medium text-black">{count}</Text>
            </View>

            <Pressable
              onPress={() => count < 10 && setCount(count + 1)}
              className="h-10 flex-1 items-center justify-center rounded-lg bg-gray-200"
            >
              <Text className="text-xl">+</Text>
            </Pressable>
          </View>
        </View>

        {/* --- Resumen --- */}
        <View style={{ marginTop: 30, zIndex: 0 }}>

          <View className="mt-3 flex flex-row justify-between border-t border-gray-200 pt-3">
            <Text className="text-2xl font-bold text-gray-900">Total</Text>
            <Text className="text-2xl font-bold text-gray-900">
              ${new Intl.NumberFormat('es-CL').format(total)}
            </Text>
          </View>
        </View>

        {/* --- Botón Comprar --- */}
        <View style={{ zIndex: 0 }}>
          <Link
            href={{
              pathname: '/reservationpage',
              params: { eventId: event._id, qty: count, type: ticketType },
            }}
            className="mt-6 flex w-full justify-center rounded-lg bg-red-600 px-4 py-3 active:bg-red-700"
          >
            <Text className="text-center text-lg font-bold text-white">
              Comprar Entradas
            </Text>
          </Link>
        </View>

      </View>
    </SafeAreaView>
  );
}
