import { supabase } from "@/utils/supabase/client";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import type { Session } from "@supabase/supabase-js";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  const router = useRouter()
  const segments = useSegments()
  const rootNavigationState = useRootNavigationState()
  const [session, setSession] = useState<Session | null>(null)
  const [authInitialized, setAuthInitialized] = useState(false)

  useEffect(() => {
    let isMounted = true
    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session ?? null)
      setAuthInitialized(true)
    })

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession)
    })

    return () => {
      isMounted = false
      subscription.subscription?.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!rootNavigationState?.key || !authInitialized) return
    const inAuthGroup = segments[0] === "(auth)"
    if (!session && !inAuthGroup) {
      router.replace("/(auth)/onboard-auth")
    } else if (session && inAuthGroup) {
      router.replace("/(tabs)")
    }
  }, [session, segments, rootNavigationState?.key, authInitialized])

  useEffect(() => { SystemUI.setBackgroundColorAsync("#121212").catch(() => {}) }, [])

  if (!fontsLoaded) {
    return null
  }

  ;(Text as any).defaultProps = (Text as any).defaultProps || {}
  ;(Text as any).defaultProps.style = [
    (Text as any).defaultProps.style,
    { fontFamily: "Inter_400Regular" }
  ]

  return (
    <GestureHandlerRootView className="flex-1" style={{ backgroundColor: "#121212" }}>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#121212" } }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}