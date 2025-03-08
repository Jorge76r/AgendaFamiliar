import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import Agendar from './agendar';
import SettingsScreen from './settings';

// Define la interfaz para las tareas
interface Task {
  id: string;
  title: string;
  description: string;
  tipo: string;
  fechaHora: string;
}

interface LayoutProps {
  user: {
    email: string;
    password: string;
  };
  onLogout: () => void;
}

const Tab = createBottomTabNavigator();

export default function Layout({ user, onLogout }: LayoutProps) {
  // Agrega el tipo explícito para las tareas
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (title: string, description: string, tipo: string, fechaHora: string) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      tipo,
      fechaHora,
    };
    setTasks([...tasks, newTask]);
  };

  const HomeTab = () => <HomeScreen user={user} onLogout={onLogout} tasks={tasks} />;
  const AgendarTab = () => <Agendar onAddTask={handleAddTask} />;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Agendar") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = "home"; // Valor por defecto para evitar el error de no definido.
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "midnightblue",
        tabBarInactiveTintColor: "slategray",
        tabBarStyle: { backgroundColor: 'white' },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{ headerTitle: 'Inicio' }}
      />
      <Tab.Screen
        name="Agendar"
        component={AgendarTab}
        options={{ headerTitle: 'Agendar' }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
