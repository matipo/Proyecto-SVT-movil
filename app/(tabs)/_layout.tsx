import { Tabs } from "expo-router";
import { HomeIcon, CartIcon } from "components/Icons";

export default function Layout() {
    return (

        <Tabs screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: 'red',

        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    tabBarIcon: ({ color }) => <HomeIcon color={color} />,
                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "Historial",
                    tabBarIcon: ({ color }) => <CartIcon color={color} />,
                }}
            />
        </Tabs>
    );
}