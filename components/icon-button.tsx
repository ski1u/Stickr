import "@/global.css"

import React from "react"

import { MaterialIcons } from "@expo/vector-icons"
import { useColorScheme } from "nativewind"
import { Pressable, Text } from "react-native"

export default function IconButton({ children, icon, size, color, onClick } : {
    children?: React.ReactNode
    icon: keyof typeof MaterialIcons.glyphMap
    size?: number
    color?: string
    onClick?: () => void
}) {
    const { colorScheme } = useColorScheme()
    return (
        <Pressable
            className="flex-col items-center gap-1"
            onPress={onClick}
        >
            <MaterialIcons
                name={icon}
                size={size || 20}
                color={color || (colorScheme === "dark" ? "#fff" : "#111")}
            />
            <Text
                className="text-sm text-black dark:text-white"
            >{children}</Text>
        </Pressable>
    )
}