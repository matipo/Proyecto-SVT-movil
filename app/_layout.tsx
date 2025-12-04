import { Stack, Link } from "expo-router";
import { View, Text } from "react-native";
import { TicketIcon } from "components/Icons";


import "../global.css";
export default function Layout() {
    return (
        <View className="flex-1">
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: 'white' },
                    headerTintColor: 'red',
                    headerTitle: () => <Link href="/"><Text className="text-black font-bold text-2xl ">TicketApp</Text></Link>,
                    headerLeft: () => <Link href="/"><TicketIcon color="red" /></Link>,

                }}
            />
        </View>
    );
}