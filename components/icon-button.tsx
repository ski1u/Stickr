import "@/global.css"

import React from "react"

import { MaterialIcons } from "@expo/vector-icons"
import { Pressable, Text } from "react-native"

export default function IconButton({ children, icon, size, color, onClick } : {
    children?: React.ReactNode
    icon: keyof typeof MaterialIcons.glyphMap
    size?: number
    color?: string
    onClick?: () => void
}) {
    return (
        <Pressable
            className="flex-col items-center gap-1"
            onPress={onClick}
        >
            <MaterialIcons
                name={icon}
                size={size || 20}
                color={color || "#fff"}
            />
            <Text
                className="text-white text-sm"
            >{children}</Text>
        </Pressable>
    )
}