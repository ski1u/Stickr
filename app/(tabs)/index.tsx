import { Text, View } from "react-native";
import { Link } from "expo-router";

import "@/global.css"
import { styles } from "@/utils/styles";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center gap-4">
      <Text className="font-semibold tracking-tighter text-4xl">
        Welcome to <Text/>
        <Text className="underline">Stickr.</Text>
      </Text>
    </View>
  );
}