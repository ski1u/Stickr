import "@/global.css"

import { Image, ImageSourcePropType, LayoutChangeEvent } from "react-native"

export default function ImageViewer({ src, className, onLayout } : {
    src: string | ImageSourcePropType
    className?: string
    onLayout?: (e: LayoutChangeEvent) => void
}) {
    const source = typeof src === "string" ? { uri: src } : src
    return (
        <Image
            source={source}
            onLayout={onLayout}
            className={["w-96 h-[80%] rounded-lg", className].filter(Boolean).join(" ")}
        />
    )
}