import { View, Text, ScrollView, Pressable } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "../components/Icons";
export default function Home() {
    return (
        <ScrollView >
            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. In accusamus id soluta molestiae voluptatem suscipit nemo laborum voluptatum neque quas quae fugiat, minima aut ab! Veritatis commodi unde ad at.</Text>
            <Link asChild href="/">
                <Pressable>
                    <HomeIcon color="red" />
                </Pressable>
            </Link>
            <Text className="text-red-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolor labore quos libero quas alias magni, consectetur nobis accusantium molestias at! Hic, quo illum eius iste nisi nemo voluptate non!</Text>
            <Text className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse dolor labore quos libero quas alias magni, consectetur nobis accusantium molestias at! Hic, quo illum eius iste nisi nemo voluptate non!</Text>

        </ScrollView>
    );
}