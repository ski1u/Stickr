import "@/global.css"

import { FontAwesome } from "@expo/vector-icons"
import { Href, Link } from "expo-router"
import React from "react"
import { Pressable, Text } from "react-native"

export default function Button({ children, variant, icon, iconColor, onClick, href, className, textClassName } : {
    children?: React.ReactNode
    variant?: "primary" | "outline"
    icon?: "picture-o"
    iconColor?: string
    onClick?: () => void
    href?: Href
    className?: string
    textClassName?: string
}) {
    const isPrimary = !variant || variant === "primary"

    const button_cn = [
        isPrimary ? "bg-[#1F6FEB]" : "bg-transparent border-[1.25px] border-[#ddd]",
        "px-4 py-3 rounded-xl w-full flex-row items-center justify-center",
    ].join(" ")
    const text_cn = [
        isPrimary ? "" : "text-[#ddd]",
        "text-white font-semibold text-sm tracking-tight text-center",
    ].filter(Boolean).join(" ")

    return !href ? (
        <Pressable
            onPress={onClick}
            className={[button_cn, className].filter(Boolean).join(" ")}
        >
            {icon && <FontAwesome name={icon} size={18} color={iconColor} style={{ marginRight: 8 }} />}
            <Text className={[text_cn, textClassName].filter(Boolean).join(" ")}>{children}</Text>
        </Pressable>
    ) : (
        <Link href={href} asChild>
            <Pressable className={[button_cn, className].filter(Boolean).join(" ")}>
                {icon && <FontAwesome name={icon} size={18} color={iconColor} style={{ marginRight: 8 }} />}
                <Text className={[text_cn, textClassName].filter(Boolean).join(" ")}>{children}</Text>
            </Pressable>
        </Link>
    )
}