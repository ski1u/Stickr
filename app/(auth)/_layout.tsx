import { getSession } from "@/utils/supabase/auth"
import { Stack, useRouter } from "expo-router"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"

export default function AuthLayout() {
  const router = useRouter()
  const { colorScheme } = useColorScheme()
  useEffect(() => {
    getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/(tabs)")
      }
    })
  }, [router])
  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { 
          backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff" 
        }
      }}
    >
      <Stack.Screen name="onboard-auth" options={{ headerShown: false }} />
      <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up" options={{ headerShown: false }} />
    </Stack>
  )
}