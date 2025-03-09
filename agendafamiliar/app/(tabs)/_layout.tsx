import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./home";
import Agendar from "./agendar";
import SettingsScreen from "./settings";

// Define la estructura de las tareas
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
}

const Tab = createBottomTabNavigator();

export default function Layout({ user, onLogout }: LayoutProps) {
  const [tasks, setTasks] = useState<Task[]>([]); // Estado para las tareas

  // Función para manejar la adición de tareas
  const handleAddTask = (
    title: string,
    description: string,
    tipo: string,
    fechaHora: string,
    recurrencia: string
  ) => {
    const newTasks: Task[] = [];
    const baseDate = new Date(fechaHora);

    if (isNaN(baseDate.getTime())) {
      alert("La fecha ingresada no es válida.");
      return;
    }

    if (recurrencia === "Diario") {
      for (let i = 0; i < 7; i++) {
        const nextDate = new Date(baseDate);
        nextDate.setDate(nextDate.getDate() + i);
        newTasks.push({
          id: (tasks.length + newTasks.length + 1).toString(),
          title,
          description,
          tipo,
          fechaHora: nextDate.toISOString(),
          recurrencia,
        });
      }
    } else if (recurrencia === "Semanal") {
      for (let i = 0; i < 4; i++) {
        const nextDate = new Date(baseDate);
        nextDate.setDate(nextDate.getDate() + i * 7);
        newTasks.push({
          id: (tasks.length + newTasks.length + 1).toString(),
          title,
          description,
          tipo,
          fechaHora: nextDate.toISOString(),
          recurrencia,
        });
      }
    } else if (recurrencia === "Mensual") {
      for (let i = 0; i < 4; i++) {
        const nextDate = new Date(baseDate);
        nextDate.setMonth(nextDate.getMonth() + i);
        newTasks.push({
          id: (tasks.length + newTasks.length + 1).toString(),
          title,
          description,
          tipo,
          fechaHora: nextDate.toISOString(),
          recurrencia,
        });
      }
    } else {
      newTasks.push({
        id: (tasks.length + newTasks.length + 1).toString(),
        title,
        description,
        tipo,
        fechaHora,
        recurrencia,
      });
    }

    setTasks((prevTasks) => [...prevTasks, ...newTasks]);
  };

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
        {() => <Agendar onAddTask={handleAddTask} />}
      </Tab.Screen>
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerTitle: "Ajustes" }} />
    </Tab.Navigator>
  );
}
