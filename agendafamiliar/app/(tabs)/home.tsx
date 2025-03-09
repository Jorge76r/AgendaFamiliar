import React from "react";
import { View, Text, FlatList, StyleSheet, Button, Image } from "react-native";

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

interface HomeScreenProps {
  user: User;
  onLogout: () => void;
  tasks: Task[];
}

export default function HomeScreen({ user, onLogout, tasks }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* Imagen de bienvenida */}
      <Image source={require("../../assets/images/home.png")} style={styles.perfil} />
      <Text style={styles.welcomeText}>Bienvenido, {user.email}</Text>

      {/* Botón para cerrar sesión */}
      <Button title="Cerrar Sesión" onPress={onLogout} />

      {/* Título para las tareas */}
      <Text style={styles.sectionTitle}>Tareas Agendadas</Text>

      {/* Lista de tareas o mensaje cuando está vacío */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>{item.title} ({item.tipo})</Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskDateTime}>Fecha y Hora: {item.fechaHora}</Text>
            <Text style={styles.taskRecurrencia}>Recurrencia: {item.recurrencia}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tareas agendadas.</Text>
        }
        contentContainerStyle={tasks.length === 0 ? styles.emptyListContainer : styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F7FA",
  },
  perfil: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  listContainer: {
    paddingBottom: 60,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  taskCard: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "#333",
  },
  taskDateTime: {
    fontSize: 12,
    color: "gray",
    marginBottom: 5,
  },
  taskRecurrencia: {
    fontSize: 12,
    color: "darkblue",
  },
});
