import "@/global.css"

import { Pressable, View } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

export default function CircleButton({ onClick } : {
    onClick?: () => void
}) {
    return (
            <MaterialIcons
                name="add"
                size={38}
                color="#000"
                className="bg-white rounded-full p-4"
                onPress={onClick}
            />
    )
}