import { getSession } from "@/utils/supabase/auth";
import { Ionicons } from "@expo/vector-icons";
import { Redirect, Tabs } from "expo-router";
import { useColorScheme } from "nativewind";
import { useEffect, useState } from "react";

export default function TabLayout() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthed, setIsAuthed] = useState(false)
  const { colorScheme } = useColorScheme()

  useEffect(() => {
    getSession().then(({ data }) => {
      setIsAuthed(!!data.session)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) return null
  if (!isAuthed) return <Redirect href="/(auth)/onboard-auth" />

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: colorScheme === "dark" ? "#1a1a1a" : "#f9f9f9", borderTopWidth: 0, height: 80, paddingTop: 8, paddingBottom: 8 },
        tabBarItemStyle: { height: "100%", justifyContent: "center", alignItems: "center" },
        headerStyle: { backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff" },
        sceneStyle: { backgroundColor: colorScheme === "dark" ? "#121212" : "#ffffff" },
        tabBarActiveTintColor: "#1F6FEB",
        tabBarShowLabel: false
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={24} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? "settings" : "settings-outline"} color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  )
}