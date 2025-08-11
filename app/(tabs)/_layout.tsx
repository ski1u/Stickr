import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1a1a1a", borderTopWidth: 0 },
        headerStyle: { backgroundColor: "#1a1a1a" },
        tabBarActiveTintColor: "#1F6FEB",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home"
              color={color}
              size={20}
            />
          )
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="information-circle"
              color={color}
              size={20}
            />
          )
        }}
      />
    </Tabs>
  )
}