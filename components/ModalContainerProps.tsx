import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity, Alert } from 'react-native';

interface SimpleBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalContainerProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalAmount: number;
  quantity: number;
}

const SimpleBottomSheet: React.FC<SimpleBottomSheetProps> = ({ isVisible, onClose, children }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback>
            <View className="h-1/2 rounded-t-3xl bg-white p-4 shadow-2xl">
              <View className="mb-4 items-center">
                <View className="h-1 w-12 rounded-full bg-gray-300" />
              </View>
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const PRESS_DURATION_MS = 1500;

// --- COMPONENTE CORREGIDO ---
const ModalContainer: React.FC<ModalContainerProps> = ({
  isVisible,
  onClose,
  onConfirm,
  totalAmount,
  quantity,
}) => {
  if (!isVisible) {
    return null;
  }

  const [isPressing, setIsPressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleConfirmationSuccess = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    setIsPressing(false);
    onConfirm();
    onClose();
  };

  useEffect(() => {
    if (isPressing) {
      let start = Date.now();

      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - start;
        const newProgress = Math.min(100, (elapsed / PRESS_DURATION_MS) * 100);

        setProgress(newProgress);

        if (newProgress >= 100) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          handleConfirmationSuccess();
        }
      }, 50);

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    } else {
      setProgress(0);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  }, [isPressing]);

  useEffect(() => {
    if (!isVisible) {
      setIsPressing(false);
      setProgress(0);
    }
  }, [isVisible]);

  const handlePressIn = () => {
    if (!isPressing) {
      setIsPressing(true);
    }
  };

  const handlePressOut = () => {
    // Detiene el proceso al soltar
    setIsPressing(false);
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View className="flex-1 items-center justify-between py-2">
        <View className="w-full items-center">
          <Text className="mb-2 text-3xl font-extrabold text-blue-600">
            ${totalAmount.toFixed(2)}
          </Text>

          <Text className="mb-8 text-center text-lg text-gray-700">
            Mantén presionado por 1.5s para confirmar la compra de {quantity} tickets.
          </Text>
        </View>

        <TouchableOpacity
          className={` h-16 w-11/12 items-center justify-center overflow-hidden rounded-xl ${isPressing ? 'bg-green-700' : 'bg-green-600'}`}
          activeOpacity={1}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}>
          <View
            className="absolute left-0 top-0 h-full bg-green-900/50"
            style={{ width: `${progress}%` }}
          />

          <Text className="z-10 text-xl font-bold text-white">
            {isPressing ? `Confirmando... (${Math.floor(progress)}%)` : 'Mantener para Comprar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="mt-4" onPress={onClose}>
          <Text className="text-base font-semibold text-red-500">Cancelar</Text>
        </TouchableOpacity>
      </View>
    </SimpleBottomSheet>
  );
};

export default ModalContainer;
