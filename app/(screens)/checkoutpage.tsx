import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';

export default function CheckoutPage() {
  const { eventId, qty, type } = useLocalSearchParams();
  console.log(eventId);
  console.log(qty);
  console.log(type);

  return (
    <View>
      <Text>
        CheckoutPage, usar useLocalSearchParams para poder obtener el eventoID, Cantidad de boletos
        y tipo de boletos {eventId} = Id del evento {qty} = Cantidad de tickets {type} = Tipo de
        ticket
      </Text>
    </View>
  );
}
