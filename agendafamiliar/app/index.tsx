import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native"; // Importar Text para manejar errores y cadenas de texto correctamente
import { Provider } from "react-redux"; // Importar Provider de Redux
import { store } from "../store/store"; // Importar el store configurado
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
  tipo: string; // Puede ser "Medicamento", "Cita Médica", etc.
  fechaHora: string; // Fecha en formato ISO
  recurrencia: string; // Puede ser "Un solo día", "Diario", etc.
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null); // Estado para el usuario autenticado
  const [showRegister, setShowRegister] = useState(false); // Controla si mostrar la pantalla de registro
  const [tasks, setTasks] = useState<Task[]>([]); // Estado global para las tareas

  // Función para manejar inicio de sesión
  const handleLogin = (email: string, password: string) => {
    setUser({ email, password }); // Establece el usuario autenticado
  };

  // Función para manejar cierre de sesión
  const handleLogout = () => {
    setUser(null); // Restablece el estado de usuario
  };

  // Función para manejar tareas nuevas
  const handleAddTask = (newTask: Task) => {
    setTasks((prevTasks) => [...prevTasks, newTask]); // Agrega la nueva tarea al estado global
    console.log("Nueva tarea agregada:", newTask); // Depura en consola
  };

  // Función para manejar el registro completado
  const handleRegisterComplete = () => {
    setShowRegister(false); // Regresa a la pantalla de login después de registrar
  };

  return (
    <Provider store={store}> {/* Proveedor para Redux */}
      <View style={styles.container}>
        {user ? (
          // Layout principal cuando el usuario está autenticado
          <Layout
            user={user}
            onLogout={handleLogout}
            onAddTask={handleAddTask} // Pasa la función para manejar tareas
          />
        ) : showRegister ? (
          // Pantalla de registro
          <RegisterScreen
            onRegisterComplete={handleRegisterComplete}
            onNavigateToLogin={() => setShowRegister(false)}
          />
        ) : (
          // Pantalla de inicio de sesión
          <LoginScreen
            onLogin={handleLogin}
            onRegister={() => setShowRegister(true)}
          />
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});