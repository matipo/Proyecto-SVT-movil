import { Slot } from "expo-router";
import { View } from "react-native";

// Importa tus estilos aquí para que estén disponibles en toda la app
import "../global.css"; // Asegúrate que la ruta al archivo sea correcta (puedes necesitar ajustar los puntos ../)

export default function Layout() {
    return (
        <View className="flex-1 bg-gray-900 p-4">
            <Slot />
        </View>
    );
}