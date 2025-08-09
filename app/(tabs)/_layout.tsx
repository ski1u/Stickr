import { Tabs } from "expo-router";

import { Ionicons } from "@expo/vector-icons"

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#222" },
        headerStyle: { backgroundColor: "#222" },
        headerTintColor: "#fff"
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="home"
              color={color}
              size={20}
            />
          )
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
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