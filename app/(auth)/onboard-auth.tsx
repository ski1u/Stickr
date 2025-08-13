import "@/global.css"

import Button from "@/components/button"
import { Text, View } from "react-native"

export default function OnboardAuth() {
  return (
    <View style={{ flex: 1, padding: 32 }}>
      <View style={{ flex: 2 }} className="justify-center items-center">
        <Text
          className="text-white font-semibold tracking-tighter"
          style={{ fontSize: 28 }}

        >Welcome to </Text>
        <Text
          className="text-white font-semibold tracking-tighter"
          style={{ textDecorationLine: "underline", textDecorationColor: "#ffffff", fontSize: 28 }}
        >Stickr.</Text>
      </View>

      <View style={{ flex: 1 }} className="justify-center items-center gap-4">
        <Button href="/(auth)/sign-in">Sign in</Button>
        <Button variant="outline" href="/(auth)/sign-up">Sign up</Button>
      </View>
    </View>
  )
}