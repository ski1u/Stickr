import { MaterialIcons } from "@expo/vector-icons"
import { useColorScheme } from "nativewind"
import { TextInput, TextInputProps, View } from "react-native"

type IconTextInputProps = TextInputProps & {
    iconName: keyof typeof MaterialIcons.glyphMap
    iconSize?: number
    iconColor?: string
    containerClassName?: string
    inputClassName?: string
}

export default function IconTextInput({
    iconName,
    iconSize = 18,
    iconColor,
    containerClassName,
    inputClassName,
    placeholderTextColor,
    ...textInputProps
}: IconTextInputProps) {
    const { colorScheme } = useColorScheme()
    const effectiveIconColor = iconColor ?? (colorScheme === "dark" ? "#ddd" : "#999")
    const effectivePlaceholder = placeholderTextColor ?? (colorScheme === "dark" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.4)")

    return (
        <View className={`flex-row items-center rounded-2xl px-4 py-3 border bg-[#f7f7f7] border-[#e5e5e5] dark:bg-white/5 dark:border-[#2a2a2a] ${containerClassName ?? ""}`}>
            <MaterialIcons name={iconName} size={iconSize} color={effectiveIconColor} />
            <TextInput
                placeholderTextColor={effectivePlaceholder}
                className={`text-[#111] dark:text-white flex-1 ml-2 text-sm ${inputClassName ?? ""}`}
                {...textInputProps}
            />
        </View>
    )
}


