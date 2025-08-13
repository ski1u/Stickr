import "@/global.css"

import { FontAwesome } from "@expo/vector-icons"
import { Href, Link } from "expo-router"
import { useColorScheme } from "nativewind"
import React from "react"
import { ActivityIndicator, Pressable, Text } from "react-native"

export default function Button({ children, variant, icon, iconColor, onClick, href, className, textClassName, loading, disabled } : {
    children?: React.ReactNode
    variant?: "primary" | "outline"
    icon?: "picture-o"
    iconColor?: string
    onClick?: () => void
    href?: Href
    className?: string
    textClassName?: string
    loading?: boolean
    disabled?: boolean
}) {
    const { colorScheme } = useColorScheme()
    const isPrimary = !variant || variant === "primary"

    const button_cn = [
        isPrimary ? "bg-[#1F6FEB]" : "bg-transparent border-[1.25px] border-[#e5e5e5] dark:border-[#2a2a2a]",
        "px-4 py-3 rounded-xl w-full flex-row items-center justify-center",
    ].join(" ")
    const text_cn = [
        "font-semibold text-sm tracking-tight text-center",
        isPrimary ? "text-white" : "text-[#111] dark:text-[#ddd]",
    ].join(" ")

    const isDisabled = !!loading || !!disabled
    const spinnerColor = isPrimary ? "#fff" : (iconColor || (colorScheme === "dark" ? "#ddd" : "#111"))
    const effectiveIconColor = iconColor ?? (colorScheme === "dark" ? "#ddd" : "#111")

    return !href ? (
        <Pressable
            onPress={onClick}
            disabled={isDisabled}
            className={[button_cn, className].filter(Boolean).join(" ")}
        >
            {loading ? (
                <ActivityIndicator size="small" color={spinnerColor} />
            ) : (
                <>
                    {icon && <FontAwesome name={icon} size={18} color={effectiveIconColor} style={{ marginRight: 8 }} />}
                    <Text className={[text_cn, textClassName].filter(Boolean).join(" ")}>{children}</Text>
                </>
            )}
        </Pressable>
    ) : (
        <Link href={href} asChild>
            <Pressable className={[button_cn, className].filter(Boolean).join(" ")} disabled={isDisabled}>
                {loading ? (
                    <ActivityIndicator size="small" color={spinnerColor} />
                ) : (
                    <>
                        {icon && <FontAwesome name={icon} size={18} color={effectiveIconColor} style={{ marginRight: 8 }} />}
                        <Text className={[text_cn, textClassName].filter(Boolean).join(" ")}>{children}</Text>
                    </>
                )}
            </Pressable>
        </Link>
    )
}