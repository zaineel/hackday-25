import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colorScheme === "dark" ? "#fff" : "#000",
        tabBarInactiveTintColor: colorScheme === "dark" ? "#666" : "#999",
        headerShown: false,
      }}>
      <Tabs.Screen
        name='sounds'
        options={{
          title: "Sounds",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='musical-notes' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='camera'
        options={{
          title: "Camera",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='camera' size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings' size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
