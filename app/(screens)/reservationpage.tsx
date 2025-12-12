import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useEffect, useState, useCallback } from "react";
import { router } from "expo-router";

import { postReservation, getTicketPrice, getEventName } from "@/api/api";
import axios from "axios";

import {
  ReservationPayload,
  ReservationResponse,
} from "types/reservation";

import CountdownTimer from "components/CountdownTimer";
import ModalContainer from "components/ModalContainerProps";

type ReservationState = ReservationResponse | null | undefined;

export default function ReservationPage() {
  const params = useLocalSearchParams();
  const eventId = params.eventId as string;
  const qty = params.qty ? parseInt(params.qty as string) : 0;
  const type = params.type as string;

  const [eventName, setEventName] = useState<string | null>(null);
  const [reservation, setReservation] = useState<ReservationState>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [hasReserved, setHasReserved] = useState(false);
  const [ticketPrice, setTicketPrice] = useState<number | null>(null);
  const [modalOn, setModalOn] = useState(false);

  const totalAmount =
    ticketPrice !== null ? ticketPrice * qty : null;

  const handleCloseModal = useCallback(() => {
    setModalOn(false);
  }, []);

  const handleConfirmPurchase = useCallback(async () => {
    if (!reservation || totalAmount === null) return;

    try {
      const checkoutResponse = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/checkout`,
        {
          reservation_id: reservation.reservation_id,
          buyer: {
            name: buyerName,
            email: buyerEmail,
          },
        }
      );

      const purchase = checkoutResponse.data;
      handleCloseModal();

      router.push({
        pathname: "/checkoutpage",
        params: { purchase: JSON.stringify(purchase) },
      });

    } catch (err) {
      console.log("Error en checkout:", err);
      Alert.alert("Error", "Hubo un problema al procesar el pago.");
    }
  }, [
    reservation,
    totalAmount,
    buyerName,
    buyerEmail,
    handleCloseModal,
  ]);

  const handlePurchase = useCallback(() => {
    if (isExpired) {
      Alert.alert(
        "Reserva Expirada",
        "El tiempo de reserva ha finalizado. Por favor, realiza una nueva reserva."
      );
      return;
    }

    if (!buyerName || !buyerEmail) {
      Alert.alert(
        "Datos incompletos",
        "Por favor, ingresa tu nombre y correo electrónico."
      );
      return;
    }

    if (!buyerEmail.includes("@")) {
      Alert.alert("Correo inválido", "Ingresa un correo válido.");
      return;
    }

    if (!reservation || totalAmount === null) {
      Alert.alert("Error", "Faltan datos para continuar.");
      return;
    }

    setModalOn(true);
  }, [
    isExpired,
    buyerName,
    buyerEmail,
    reservation,
    totalAmount,
  ]);

  useEffect(() => {
    if (hasReserved) return;

    if (!eventId || !qty || !type) {
      setError("Faltan parámetros del evento.");
      return;
    }

    const fetch = async () => {
      setIsLoading(true);
      setError(null);
      setReservation(undefined);
      setTicketPrice(null);

      const payload: ReservationPayload = {
        event_id: eventId,
        items: [{ type, quantity: qty }],
      };

      try {
        const reservationResponse =
          await postReservation(payload);

        setReservation(reservationResponse);

        const price = await getTicketPrice(eventId, type);
        if (price !== null) setTicketPrice(price);

        const name = await getEventName(eventId);
        setEventName(name);

      } catch (err) {
        const msg =
          (err as Error).message || "Error desconocido.";
        let display = msg;

        if (msg.includes("Not enough")) {
          display =
            "No quedan tickets disponibles del tipo solicitado.";
        }

        setError(display);
        Alert.alert("Error de Reserva", display);
      } finally {
        setIsLoading(false);
        setHasReserved(true);
      }
    };

    fetch();
  }, [eventId, qty, type, hasReserved]);

  // Loading
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-5">
        <ActivityIndicator size="large" color="red" />
        <Text className="mt-2 text-base text-center">
          Creando reserva...
        </Text>
      </View>
    );
  }

  // Error
  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-5">
        <Text className="text-red-600 text-lg font-bold">
          Error al crear la reserva
        </Text>
        <Text className="mt-1 text-red-500 text-center">
          {error}
        </Text>
      </View>
    );
  }

  // MAIN
  if (reservation) {
    return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <View className="flex-1 bg-white">
          
          {/* SCROLL SUPERIOR */}
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ paddingBottom: 180 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="w-full items-center px-5 pt-8">

              <View className="w-full max-w-sm items-center">
                <CountdownTimer
                  expirationTime={reservation.expires_at}
                  onTimerEnd={() => setIsExpired(true)}
                />

                <Text className="mt-4 text-sm text-gray-500">
                  ID de Reserva:{" "}
                  <Text className="font-semibold">
                    {reservation.reservation_id}
                  </Text>
                </Text>
              </View>

              <View className="mt-8 w-full max-w-sm rounded-lg bg-gray-100 p-4 shadow-sm">
                <Text className="mb-2 text-lg font-bold text-gray-800">
                  Detalles del Pedido
                </Text>

                <Text className="text-sm text-gray-700">
                  Evento: {eventName}
                </Text>
                <Text className="text-sm text-gray-700">
                  Cantidad: {qty}
                </Text>
                <Text className="text-sm text-gray-700">
                  Tipo: {type}
                </Text>

                {ticketPrice !== null && (
                  <>
                    <Text className="mt-2 text-sm font-semibold text-gray-700">
                      Precio Unitario: $
                      {ticketPrice.toLocaleString("es-CL")}
                    </Text>
                    <Text className="mt-1 text-lg font-extrabold text-gray-800">
                      Total a Pagar: $
                      {totalAmount!.toLocaleString("es-CL")}
                    </Text>
                  </>
                )}
              </View>

              {/* INPUTS */}
              <View className="mt-6 w-full max-w-sm">
                <Text className="mb-3 text-base font-bold text-gray-800">
                  Datos del Comprador
                </Text>

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
          </ScrollView>

          {/* FOOTER (BOTÓN) */}
          <View className="border-t border-gray-200 bg-white px-5 py-4 shadow-xl">
            <Pressable
              onPress={handlePurchase}
              disabled={isExpired || totalAmount === null}
              className={`
                rounded-lg p-4 shadow-md mb-12 
                ${
                  isExpired || totalAmount === null
                    ? "bg-red-300"
                    : "bg-red-600"
                }
              `}
            >
              <Text className="text-center text-xl font-bold text-white">
                {isExpired
                  ? "Reserva Expirada"
                  : totalAmount === null
                  ? "Cargando Precio..."
                  : "Proceder al Pago"}
              </Text>
            </Pressable>
          </View>

          {/* MODAL */}
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
      </KeyboardAvoidingView>
    );
  }

  return (
    <View className="flex-1 items-center justify-center bg-white p-5">
      <Text className="text-gray-500 text-base">
        Esperando datos de reserva...
      </Text>
    </View>
  );
}
