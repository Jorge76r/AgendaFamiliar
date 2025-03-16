import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import Agendar from "./agendar";
import SettingsScreen from "./settings";

interface Task {
  id: string;
  title: string;
  description: string;
  tipo: string;
  fechaHora: string;
  recurrencia: string;
}

interface LayoutProps {
  user: {
    email: string;
    password: string;
  };
  onLogout: () => void;
  tasks: Task[]; // Recibir tasks desde Index
  onAddTask: (
    title: string,
    description: string,
    tipo: string,
    fechaHora: string,
    recurrencia: string
  ) => void;
}

const Tab = createBottomTabNavigator();

export default function Layout({ user, onLogout, tasks, onAddTask }: LayoutProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") iconName = focused ? "home" : "home-outline";
          else if (route.name === "Agendar")
            iconName = focused ? "add-circle" : "add-circle-outline";
          else iconName = focused ? "settings" : "settings-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "midnightblue",
        tabBarInactiveTintColor: "slategray",
        tabBarStyle: { backgroundColor: "white" },
      })}
    >
      <Tab.Screen name="Home" options={{ headerTitle: "Inicio" }}>
        {() => <HomeScreen user={user} onLogout={onLogout} tasks={tasks} />}
      </Tab.Screen>
      <Tab.Screen name="Agendar" options={{ headerTitle: "Agendar" }}>
        {() => <Agendar onAddTask={onAddTask} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: "Ajustes" }} />
    </Tab.Navigator>
  );
}
