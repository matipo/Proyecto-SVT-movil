import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator, Alert, TextInput, Pressable } from 'react-native';
import { useEffect, useState, useCallback } from 'react';

// API
import { postReservation, getTicketPrice } from '@/api/api';

// Types
import { ReservationPayload, ReservationResponse } from 'types/reservation';

// Components
import CountdownTimer from 'components/CountdownTimer';
import ModalContainer from 'components/ModalContainerProps';

type ReservationState = ReservationResponse | null | undefined;

export default function ReservationPage() {
  const params = useLocalSearchParams();
  const eventId = params.eventId as string;
  const qty = params.qty ? parseInt(params.qty as string) : 0;
  const type = params.type as string;

  const [reservation, setReservation] = useState<ReservationState>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [isExpired, setIsExpired] = useState(false);
  const [hasReserved, setHasReserved] = useState(false);
  const [ticketPrice, setTicketPrice] = useState<number | null>(null);

  const [modalOn, setModalOn] = useState(false);

  const totalAmount = ticketPrice !== null ? ticketPrice * qty : null;

  // Cerrar modal
  const handleCloseModal = useCallback(() => {
    setModalOn(false);
  }, []);

  // Confirmar pago dentro del modal
  const handleConfirmPurchase = useCallback(() => {
    if (!reservation || totalAmount === null) return;
    handleCloseModal();
  }, [handleCloseModal, reservation, totalAmount]);

  // Botón principal: abrir modal o mostrar errores
  const handlePurchase = useCallback(() => {
    if (isExpired) {
      Alert.alert(
        'Reserva Expirada',
        'El tiempo de reserva ha finalizado. Por favor, realiza una nueva reserva.'
      );
      return;
    }

    if (!buyerName || !buyerEmail) {
      Alert.alert('Datos incompletos', 'Por favor, ingresa tu nombre y correo electrónico.');
      return;
    }

    if (!reservation || totalAmount === null) {
      Alert.alert('Error', 'Faltan datos de la reserva o el precio.');
      return;
    }

    setModalOn(true);
  }, [isExpired, buyerName, buyerEmail, reservation, totalAmount]);

  // Crear reserva + traer precio
  useEffect(() => {
    if (hasReserved) return;

    if (!eventId || !qty || !type) {
      setError('Faltan parámetros de evento, cantidad o tipo de boleto.');
      return;
    }

    const fetchReservationAndPrice = async () => {
      setIsLoading(true);
      setError(null);
      setReservation(undefined);
      setTicketPrice(null);

      const reservationPayload: ReservationPayload = {
        event_id: eventId,
        items: [{ type, quantity: qty }],
      };

      try {
        const reservationResponse = await postReservation(reservationPayload);
        setReservation(reservationResponse);

        const price = await getTicketPrice(eventId, type);
        if (price !== null) {
          setTicketPrice(price);
        } else {
          throw new Error('No se pudo obtener el precio del ticket.');
        }
      } catch (err) {
        const errorMessage = (err as Error).message || 'Error de red o desconocido.';

        let displayMessage = errorMessage;

        if (errorMessage.includes('Not enough')) {
          displayMessage = 'Lo sentimos, no quedan tickets disponibles del tipo solicitado.';
        }

        setError(displayMessage);
        Alert.alert('Error de Reserva', displayMessage);
      } finally {
        setIsLoading(false);
        setHasReserved(true);
      }
    };

    fetchReservationAndPrice();
  }, [eventId, qty, type, hasReserved]);

  // LOADING
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-5">
        <ActivityIndicator size="large" color="red" />
        <Text className="mt-2 text-center text-base">Creando reserva...</Text>
      </View>
    );
  }

  // ERROR
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-5">
        <Text className="text-center text-lg font-bold text-red-600">
          Error al crear la reserva:
        </Text>
        <Text className="mt-1 text-center text-base text-red-500">{error}</Text>
        <Text className="mt-4 text-center text-base text-gray-700">
          Por favor, inténtalo de nuevo.
        </Text>
      </View>
    );
  }

  // RESERVA CREADA
  if (reservation) {
    return (
      <View className="flex-1 justify-between bg-white">
        <View className="w-full items-center px-5 pt-8">
          <View className="w-full max-w-sm items-center">
            <CountdownTimer
              expirationTime={reservation.expires_at}
              onTimerEnd={() => setIsExpired(true)}
            />

            <Text className="mt-4 text-sm text-gray-500">
              ID de Reserva: <Text className="font-semibold">{reservation.reservation_id}</Text>
            </Text>
          </View>

          {/* Detalles */}
          <View className="mt-8 w-full max-w-sm rounded-lg bg-gray-100 p-4 shadow-sm">
            <Text className="mb-2 text-lg font-bold text-gray-800">Detalles del Pedido</Text>

            <Text className="text-sm text-gray-700">Evento ID: {eventId}</Text>
            <Text className="text-sm text-gray-700">Cantidad: {qty}</Text>
            <Text className="text-sm text-gray-700">Tipo: {type}</Text>

            {ticketPrice !== null && (
              <>
                <Text className="mt-2 text-sm font-semibold text-gray-700">
                  Precio Unitario: ${ticketPrice.toFixed(2)}
                </Text>
                <Text className="mt-1 text-lg font-extrabold text-gray-800">
                  Total a Pagar: ${totalAmount!.toFixed(2)}
                </Text>
              </>
            )}
          </View>

          {/* Datos del comprador */}
          <View className="mt-6 w-full max-w-sm">
            <Text className="mb-3 text-base font-bold text-gray-800">Datos del Comprador</Text>

            <TextInput
              className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
              placeholder="Nombre Completo"
              value={buyerName}
              onChangeText={setBuyerName}
              editable={!isExpired}
            />

            <TextInput
              className="mb-4 rounded-lg border border-gray-300 p-3 text-base"
              placeholder="Correo Electrónico"
              value={buyerEmail}
              onChangeText={setBuyerEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!isExpired}
            />
          </View>
        </View>

        {/* BOTÓN PAGAR */}
        <View className="w-full border-t border-gray-200 bg-white px-5 py-4 shadow-xl">
          <Pressable
            className={`rounded-lg p-4 shadow-md ${
              isExpired || totalAmount === null ? 'bg-red-400' : 'bg-red-600'
            }`}
            onPress={handlePurchase}
            disabled={isExpired || totalAmount === null}>
            <Text className="text-center text-xl font-bold text-white">
              {isExpired
                ? 'Reserva Expirada'
                : totalAmount === null
                  ? 'Cargando Precio...'
                  : 'Proceder al Pago'}
            </Text>
          </Pressable>
        </View>

        {/* MODAL PAGO */}
        {modalOn && totalAmount !== null && (
          <ModalContainer
            isVisible={modalOn}
            onClose={handleCloseModal}
            onConfirm={handleConfirmPurchase}
            totalAmount={totalAmount}
            quantity={qty}
          />
        )}
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <Text className="text-base text-gray-500">Esperando datos de reserva...</Text>
    </View>
  );
}
