import "@/global.css"

import { Image, ImageSourcePropType } from "react-native"

export default function ImageViewer({ src, className } : {
    src: string | ImageSourcePropType
    className?: string
}) {
    const source = typeof src === "string" ? { uri: src } : src
    return (
        <Image
            source={source}
            className={["w-96 h-[80%] rounded-lg", className].filter(Boolean).join(" ")}
        />
    )
}