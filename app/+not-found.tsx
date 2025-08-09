import "@/global.css"
import { styles } from "@/utils/styles"

import { Text, View } from "react-native"
import { Link } from "expo-router"

export default function NotFound() {
    return (
        <>
            <View className="flex-1 justify-center items-center gap-4">
                <Text className="text-semibold text-4xl tracking-tighter">
                    Uh oh! Page not found.
                </Text>

                <Link href="/" style={styles.button}>
                    Go back to Home
                </Link>
            </View>
        </>
    )
}