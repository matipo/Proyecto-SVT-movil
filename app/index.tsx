
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
    return <View>
        <Text className="text-white">Página de inicio</Text>
        <Text className="text-white">Página de inicio</Text>
        <Text className="text-white">Página de inicio</Text>
        <Link href="/home" className="text-blue-400-">Ir al home</Link>
    </View>
}