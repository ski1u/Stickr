import "@/global.css"

import { Image } from "expo-image"
import { ImageSourcePropType, View } from "react-native"

export default function EmojiSticker({ size, sticker } : {
    size: number
    sticker: string | ImageSourcePropType
}) {
    return (
        <View
            className=""
        >
            <Image
                source={typeof sticker === "string" ? { uri: sticker } : sticker}
                style={{ width: size, height: size }}
            />
        </View>
    )
}