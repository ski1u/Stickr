import React from "react"
import { Text, View } from "react-native"

export default function SettingsSection({ title, children } : {
    title: string
    children?: React.ReactNode
}) {
    return (
        <View>
            <Text className="text-[#7c7c7c] dark:text-[#9aa0a6] text-xs tracking-widest mb-3">{title}</Text>
            <View className="rounded-2xl overflow-hidden border bg-white dark:bg-[#191919] border-[#e5e5e5] dark:border-[#2a2a2a]">
                {children}
            </View>
        </View>
    )
}


