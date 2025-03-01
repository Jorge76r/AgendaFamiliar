import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import Anadirtarea from './anadirtarea';

// Definimos la interfaz para las props de Layout
interface LayoutProps {
  user: {
    email: string;
    password: string;
  };
  onLogout: () => void;
}

const Tab = createBottomTabNavigator();

export default function Layout({ user, onLogout }: LayoutProps) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Tarea 1', description: 'Descripción de la tarea 1' },
    { id: '2', title: 'Tarea 2', description: 'Descripción de la tarea 2' },
    
  ]);

  const handleAddTask = (title: string, description: string) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      description
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
        headerShown: true, // Asegura de que el header se muestre
      })}
    >
      <Tab.Screen
        name="home"
        options={{ headerTitle: 'Inicio' }}
      >
        {() => <HomeScreen user={user} onLogout={onLogout} tasks={tasks} />}
      </Tab.Screen>
      <Tab.Screen
        name="anadirtarea"
        options={{ headerTitle: 'Añadir Tarea' }}
      >
        {() => <Anadirtarea onAddTask={handleAddTask} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
