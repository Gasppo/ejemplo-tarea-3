import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, animation: 'shift' }}>
    <Tabs.Screen
      name="index"
      options={{
        title: 'Contador',
        tabBarIcon: ({ color }) => <Ionicons name="calculator-outline" color={color} size={26} />
      }} />
    <Tabs.Screen
      name="tarjetas"
      options={{
        title: 'Tarjetas',
        tabBarIcon: ({ color }) => <Ionicons name="card-outline" color={color} size={26} />
      }} />
    <Tabs.Screen
      name="perfil"
      options={{
        title: 'Perfil',
        tabBarIcon: ({ color }) => <Ionicons name="person-outline" color={color} size={26} />
      }} />
    <Tabs.Screen
      name="gallery"
      options={{
        title: 'Galeria',
        tabBarIcon: ({ color }) => <Ionicons name="images" color={color} size={26} />
      }} />
    <Tabs.Screen
      name="gestures"
      options={{
        title: 'Gestos',
        tabBarIcon: ({ color }) => <Ionicons name="hand-left-outline" color={color} size={26} />
      }} />
  </Tabs>
}
