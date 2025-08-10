import "@/global.css"

import { useState } from "react"

import { Image } from "expo-image"
import { FlatList, ImageSourcePropType, Platform, Pressable, View } from "react-native"

export default function EmojiList({ onSelect, onClose } : {
    onSelect: (image: ImageSourcePropType) => void
    onClose: () => void
}) {
    const [emoji] = useState([
        require("@/assets/images/emoji1.png"),
        require("@/assets/images/emoji2.png"),
        require("@/assets/images/emoji3.png"),
        require("@/assets/images/emoji4.png"),
        require("@/assets/images/emoji5.png"),
        require("@/assets/images/emoji6.png")
    ])

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === "web"}
            data={emoji}
            contentContainerStyle={{ paddingHorizontal: 8 }}
            ItemSeparatorComponent={() => <View style={{ width: 24 }} />}
            renderItem={({ item, index }) => (
                <Pressable
                    onPress={() => {
                        onSelect(item)
                        onClose()
                    }}
                >
                    <Image
                        source={item}
                        key={index}
                        style={{ width: 80, height: 80 }}
                    />
                </Pressable>
            )}  
        />
    )
}