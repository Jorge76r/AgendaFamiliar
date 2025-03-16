import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./login";
import RegisterScreen from "./register";
import Layout from "./(tabs)/_layout";

interface User {
  email: string;
  password: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  tipo: string;
  fechaHora: string;
  recurrencia: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setUser({ email, password });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddTask = (
    title: string,
    description: string,
    tipo: string,
    fechaHora: string,
    recurrencia: string
  ) => {
    const newTask = {
      id: (tasks.length + 1).toString(),
      title,
      description,
      tipo,
      fechaHora,
      recurrencia,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    fetchTasks();
  }, []);

  const handleRegisterComplete = () => {
    setShowRegister(false); // Vuelve al login después del registro
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Layout
          user={user}
          onLogout={handleLogout}
          tasks={tasks}
          onAddTask={handleAddTask}
        />
      ) : showRegister ? (
        <RegisterScreen onRegisterComplete={handleRegisterComplete} />
      ) : (
        <LoginScreen onLogin={handleLogin} onRegister={() => setShowRegister(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
