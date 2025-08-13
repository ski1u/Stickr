import { supabase } from "@/utils/supabase/client";
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Session } from "@supabase/supabase-js";
import { Stack, useRootNavigationState, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useColorScheme } from "nativewind";
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
  const { colorScheme, setColorScheme } = useColorScheme()

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

  useEffect(() => {
    // load persisted theme preference
    AsyncStorage.getItem("theme").then((stored) => {
      if (stored === "dark" || stored === "light") {
        setColorScheme(stored as any)
      }
    }).catch(() => {})
  }, [setColorScheme])

  useEffect(() => {
    const bg = colorScheme === "dark" ? "#121212" : "#ffffff"
    SystemUI.setBackgroundColorAsync(bg).catch(() => {})
  }, [colorScheme])

  if (!fontsLoaded) {
    return null
  }

  ;(Text as any).defaultProps = (Text as any).defaultProps || {}
  ;(Text as any).defaultProps.style = [
    (Text as any).defaultProps.style,
    { fontFamily: "Inter_400Regular" }
  ]

  return (
    <GestureHandlerRootView className="flex-1 bg-white dark:bg-[#121212]">
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false,
            contentStyle: { backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff" }
          }} 
        />
        <Stack.Screen name="+not-found" options={{ headerShown: false }} />
      </Stack>
    </GestureHandlerRootView>
  )
}