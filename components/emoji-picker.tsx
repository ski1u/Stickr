import "@/global.css"

import React from "react"

import { MaterialIcons } from "@expo/vector-icons"
import { Modal, Pressable, Text, View } from "react-native"

export default function EmojiPicker({ children, isVisible, onClose } : {
    children?: React.ReactNode
    isVisible: boolean
    onClose?: () => void
}) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            presentationStyle="overFullScreen"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <Pressable className="flex-1 bg-black/60 justify-end" onPress={onClose}>
                <Pressable className="w-full max-h-[60%] bg-[#121212]" onPress={() => {}}>
                    <View className="flex-row items-center justify-between p-4">
                        <Text className="text-white text-lg font-semibold">Choose a stickr</Text>
                        <MaterialIcons
                            name="close"
                            color="#ddd"
                            size={22}
                            onPress={onClose}
                        />
                    </View>
                    <View style={{ paddingBottom: 32 }}>
                        {children}
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    )
}