import React, { useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './home';
import Anadirtarea from './agendar';
import SettingsScreen from './settings';

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
    { id: '', title: '', description: '' }, 
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
        name="Home"
        component={() => <HomeScreen user={user} onLogout={onLogout} tasks={tasks} />}
        options={{ headerTitle: 'Inicio' }}
      />
      <Tab.Screen
        name="Agendar"
        component={() => <Anadirtarea onAddTask={handleAddTask} />}
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
