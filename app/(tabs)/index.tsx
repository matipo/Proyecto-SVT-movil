
import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
    return <View className="flex-1 justify-center items-center space-y-4">
        <Text className="">Página de inicio</Text>
        <Text className="">Página de inicio</Text>
        <Text className="">Página de inicio</Text>
        <Link href="/history" className="">Ir al history</Link>
    </View>
}