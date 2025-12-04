import { Text, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "../../components/Icons";
export default function History() {
    return (
        <ScrollView >
            <Text>El boton de casa roja este es funcional y te manda al index, este boton esta en app/(tabs)/history.tsx.</Text>
            <Link asChild href="/">
                <Pressable>
                    <HomeIcon color="red" />
                </Pressable>
            </Link>
            <Text className="text-red-400">ESTE ES SOLO PRUEBAS, LUEGO SE CAMBIARÁ DE LUGAR</Text>
            <Link href='/reservationpage' className="text-blue-400">Ir a reservationpage</Link>
        </ScrollView>
    );
}