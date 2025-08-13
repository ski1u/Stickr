import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#1a1a1a", borderTopWidth: 0, height: 80, paddingTop: 8, paddingBottom: 8 },
        tabBarItemStyle: { height: "100%", justifyContent: "center", alignItems: "center" },
        headerStyle: { backgroundColor: "#121212" },
        sceneStyle: { backgroundColor: "#121212" },
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