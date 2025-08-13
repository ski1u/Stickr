import React from "react"
import { Pressable, Text, View, ViewProps } from "react-native"

type SettingsRowProps = ViewProps & {
    onPress?: () => void
    right?: React.ReactNode
    destructive?: boolean
    bordered?: boolean
}

export default function SettingsRow({ onPress, right, destructive, bordered = true, children, ...rest } : SettingsRowProps) {
    const content = (
        <View className={["px-4 py-4", bordered ? "border-b border-[#e5e5e5] dark:border-[#2a2a2a]" : ""].filter(Boolean).join(" ")} {...rest}>
            <View className="flex-row items-center justify-between">
                <Text className={["text-base", destructive ? "text-red-400" : "text-black dark:text-white"].join(" ")}>{children}</Text>
                {right}
            </View>
        </View>
    )

    if (!onPress) return content
    return (
        <Pressable onPress={onPress}>
            {content}
        </Pressable>
    )
}


