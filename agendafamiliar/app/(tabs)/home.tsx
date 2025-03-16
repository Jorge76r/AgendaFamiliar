import React from "react";
import { View, Text, FlatList, StyleSheet, Button, Image } from "react-native";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface User {
  email?: string; // Opcional para evitar errores
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
  user?: User; // `user` opcional
  onLogout: () => void;
  tasks?: Task[]; // `tasks` opcional
}

export default function HomeScreen({ user = {}, onLogout, tasks = [] }: HomeScreenProps) {
  const { theme } = useTheme(); // Acceso al contexto del tema
  const { language } = useLanguage(); // Acceso al contexto del idioma
  const styles = theme === "dark" ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      {/* Imagen de bienvenida */}
      <Image source={require("../../assets/images/home.png")} style={styles.perfil} />
      
      {/* Texto de bienvenida */}
      <Text style={styles.welcomeText}>
        {language === "es" ? "Bienvenido" : "Welcome"}, {user?.email || (language === "es" ? "invitado" : "guest")}
      </Text>

      {/* Botón para cerrar sesión */}
      <Button
        title={language === "es" ? "Cerrar Sesión" : "Logout"}
        onPress={onLogout}
        color={theme === "dark" ? "#FF6B6B" : "#007bff"}
      />

      {/* Título de la sección de tareas */}
      <Text style={styles.sectionTitle}>
        {language === "es" ? "Tareas Agendadas" : "Scheduled Tasks"}
      </Text>

      {/* Lista de tareas o mensaje de lista vacía */}
      <FlatList
        data={tasks} // Siempre será un array por defecto
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.taskTitle}>
              {item.title} ({item.tipo})
            </Text>
            <Text style={styles.taskDescription}>{item.description}</Text>
            <Text style={styles.taskDateTime}>
              {language === "es" ? "Fecha y Hora" : "Date and Time"}: {item.fechaHora}
            </Text>
            <Text style={styles.taskRecurrencia}>
              {language === "es" ? "Recurrencia" : "Recurrence"}: {item.recurrencia}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {language === "es" ? "No hay tareas agendadas." : "No scheduled tasks."}
          </Text>
        }
        contentContainerStyle={tasks.length === 0 ? styles.emptyListContainer : styles.listContainer}
      />
    </View>
  );
}

const lightStyles = StyleSheet.create({
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
    color: "#000",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
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
    color: "#333",
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

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#1E1E1E",
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
    color: "#FFF",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#FFF",
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
    backgroundColor: "#2A2A2A",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#FFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#FFF",
  },
  taskDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: "#CCC",
  },
  taskDateTime: {
    fontSize: 12,
    color: "#AAA",
    marginBottom: 5,
  },
  taskRecurrencia: {
    fontSize: 12,
    color: "#FFD700",
  },
});
