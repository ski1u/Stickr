import "@/global.css"

import { useEffect } from "react"
import { ImageSourcePropType } from "react-native"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue } from "react-native-reanimated"

type Bounds = { x: number; y: number; width: number; height: number } | undefined

export default function EmojiSticker({ size, sticker, bounds } : {
    size: number
    sticker: string | ImageSourcePropType
    bounds?: Bounds
}) {
    const imageScale = useSharedValue(size)
    const translateX = useSharedValue(0)
    const translateY = useSharedValue(0)
    const startX = useSharedValue(0)
    const startY = useSharedValue(0)
    const rotationZ = useSharedValue(0)
    const rotationStart = useSharedValue(0)
    const pinchStartSize = useSharedValue(size)

    // ---

    useEffect(() => {
        if (!bounds) return
        const stickerSize = imageScale.value
        const centerX = bounds.x + (bounds.width - stickerSize) / 2
        const centerY = bounds.y + (bounds.height - stickerSize) / 2
        translateX.value = centerX
        translateY.value = centerY
        startX.value = centerX
        startY.value = centerY
    }, [bounds, size])

    const sizeStyle = useAnimatedStyle(() => {
        return { width: imageScale.value, height: imageScale.value }
    })

    const drag = Gesture.Pan()
    .onStart(() => { startX.value = translateX.value; startY.value = translateY.value })
    .onChange(({ translationX, translationY }) => {
        let nextX = startX.value + translationX
        let nextY = startY.value + translationY

        if (bounds) {
            const stickerSize = imageScale.value
            const minX = bounds.x
            const maxX = bounds.x + bounds.width - stickerSize
            const minY = bounds.y
            const maxY = bounds.y + bounds.height - stickerSize

            if (nextX < minX) nextX = minX
            if (nextX > maxX) nextX = maxX
            if (nextY < minY) nextY = minY
            if (nextY > maxY) nextY = maxY
        }

        translateX.value = nextX
        translateY.value = nextY
    })

    const pinch = Gesture.Pinch()
    .onStart(() => { pinchStartSize.value = imageScale.value })
    .onChange(({ scale }) => {
        const nextSize = pinchStartSize.value * scale
        // Simple clamp to keep sticker within reasonable size
        const minSize = Math.max(20, size / 2)
        const maxSize = size * 6
        imageScale.value = Math.min(Math.max(nextSize, minSize), maxSize)
    })

    const rotate = Gesture.Rotation()
    .onStart(() => { rotationStart.value = rotationZ.value })
    .onChange(({ rotation }) => { rotationZ.value = rotationStart.value + rotation })

    const combined = Gesture.Simultaneous(drag, pinch, rotate)

    const dragStyle = useAnimatedStyle(() => {
        return { transform: [{ translateX: translateX.value }, { translateY: translateY.value }] }
    })

    const rotateStyle = useAnimatedStyle(() => {
        return { transform: [{ rotate: `${rotationZ.value}rad` }] }
    })

    return (
        <GestureDetector
            gesture={combined}
        >
            <Animated.View style={dragStyle}>
                <Animated.Image
                    source={typeof sticker === "string" ? { uri: sticker } : sticker}
                    style={[sizeStyle, rotateStyle, { width: size, height: size }]}
                />
            </Animated.View>
        </GestureDetector>
    )
}