import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

export default function CheckoutPage() {
  const params = useLocalSearchParams();

  const purchase = params.purchase
    ? JSON.parse(params.purchase as string)
    : null;

  if (!purchase) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-lg font-semibold">
          No se encontró el comprobante.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-6">
      <Text className="text-3xl font-bold text-center text-green-600 mb-8">
        Compra Confirmada ✔
      </Text>

      <View className="mb-5">
        <Text className="text-gray-500 font-semibold">ID de Compra:</Text>
        <Text className="text-lg text-black">{purchase._id}</Text>
      </View>

      <View className="mb-5">
        <Text className="text-gray-500 font-semibold">Evento:</Text>
        <Text className="text-lg text-black">
          {purchase.event_name || purchase.event_id}
        </Text>
      </View>

      <View className="mb-5">
        <Text className="text-gray-500 font-semibold">Total Pagado:</Text>
        <Text className="text-2xl font-bold text-green-600">
          ${purchase.total_price.toLocaleString("es-CL")}
        </Text>
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold mb-2">Datos del Comprador</Text>

        <Text className="text-gray-500 font-semibold">Nombre:</Text>
        <Text className="text-lg">{purchase.buyer?.name}</Text>

        <Text className="text-gray-500 font-semibold mt-3">Email:</Text>
        <Text className="text-lg">{purchase.buyer?.email}</Text>
      </View>

      <View className="mb-6">
        <Text className="text-xl font-bold mb-3">Tickets Emitidos</Text>

        {purchase.tickets?.map((t: any, idx: any) => (
          <View
            key={idx}
            className="bg-gray-100 p-4 rounded-xl mb-3 border border-gray-200"
          >
            <Text className="text-base">🎟 Código: {t.code}</Text>
            <Text className="text-base mt-1">Tipo: {t.type}</Text>
          </View>
        ))}
      </View>

      <View className="mb-6">
        <Text className="text-gray-500 font-semibold">Fecha de Confirmación:</Text>
        <Text className="text-lg">
          {new Date(purchase.confirmed_at).toLocaleString()}
        </Text>
      </View>
      <Link
        href="/"
        className="w-full bg-red-600 py-4 rounded-xl  mb-12"
      >
        <Text className="text-center text-white font-semibold text-lg">
          Volver al Inicio
        </Text>
      </Link>



    </ScrollView>
  );
}
