import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import Anadirtarea from './anadirtarea';
import SettingsScreen from './settings';

// Ajustamos LayoutProps para reflejar correctamente el tipo de user
interface LayoutProps {
  user: {
    email: string; // Solo necesitamos el correo
  };
  onLogout: () => void;
}

const Tab = createBottomTabNavigator();

export default function Layout({ user, onLogout }: LayoutProps) {
  // Tareas de ejemplo para mostrar en la lista
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tarea 1', description: 'Descripción de la tarea 1' },
    { id: '2', title: 'Tarea 2', description: 'Descripción de la tarea 2' },
  ]);

  // Maneja la adición de nuevas tareas
  const handleAddTask = (title: string, description: string) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      description,
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "anadirtarea") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else {
            iconName = "home"; // Valor por defecto para evitar el error de no definido.
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "midnightblue",
        tabBarInactiveTintColor: "slategray",
        tabBarStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarItemStyle: {
          flex: 1,
        },
        headerShown: true,
      })}
    >
      <Tab.Screen
        name="home"
        component={() => <HomeScreen user={user} onLogout={onLogout} tasks={tasks} />}
        options={{ headerTitle: 'Inicio' }}
      />
      <Tab.Screen
        name="anadirtarea"
        component={() => <Anadirtarea onAddTask={handleAddTask} />}
        options={{ headerTitle: 'Añadir Tarea' }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{ headerTitle: 'Settings' }}
      />
    </Tab.Navigator>
  );
}
