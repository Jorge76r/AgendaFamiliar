import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import axios from "axios"; // Para solicitudes al backend
import { lightTheme, darkTheme } from "@/styles/themes";
import { RootState } from "../../store/store";
import { useLanguage } from "@/contexts/LanguageContext";
import { BASE_URL } from "@/config/api"; // URL base del backend

// Función para generar recurrencias de tareas
function generateOccurrences(task: any) {
  const occurrences = [];
  const baseDate = new Date(task.fechaHora);

  if (task.recurrencia === "Diario") {
    for (let i = 0; i < 4; i++) {
      const occurrence = new Date(baseDate);
      occurrence.setDate(baseDate.getDate() + i);
      occurrences.push({ ...task, fechaHora: occurrence.toISOString() });
    }
  } else if (task.recurrencia === "Semanal") {
    for (let i = 0; i < 4; i++) {
      const occurrence = new Date(baseDate);
      occurrence.setDate(baseDate.getDate() + i * 7);
      occurrences.push({ ...task, fechaHora: occurrence.toISOString() });
    }
  } else if (task.recurrencia === "Mensual") {
    for (let i = 0; i < 4; i++) {
      const occurrence = new Date(baseDate);
      occurrence.setMonth(baseDate.getMonth() + i);
      occurrences.push({ ...task, fechaHora: occurrence.toISOString() });
    }
  } else {
    occurrences.push(task);
  }

  return occurrences;
}

export default function HomeScreen({
  user,
  onLogout,
  theme,
}: {
  user?: { email?: string };
  onLogout: () => void;
  theme: "light" | "dark";
}) {
  const localTasks = useSelector((state: RootState) => state.agendar); // Tareas locales del store Redux
  const [dbTasks, setDbTasks] = useState([]); // Tareas obtenidas desde la base de datos
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const expandedTasks = [
    ...localTasks.flatMap((task) => generateOccurrences(task)),
    ...dbTasks.flatMap((task) => generateOccurrences(task)),
  ];

  useEffect(() => {
    const fetchTasksFromDb = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/agendar`);
        setDbTasks(response.data || []); // Asegurarse de que sea un array válido
      } catch (error: any) {
        console.error("Error al obtener tareas desde la base de datos:", error.message);
      }
    };

    fetchTasksFromDb();
  }, [localTasks]); // Escucha cambios en localTasks

  return (
    <View style={themeStyles.container}>
      <Image source={require("../../assets/images/home.png")} style={styles.logo} />
      <Text style={themeStyles.title}>
        {language === "es" ? "Bienvenido" : "Welcome"},{" "}
        {user?.email || (language === "es" ? "invitado" : "guest")}
      </Text>
      <Button
        title={language === "es" ? "Cerrar Sesión" : "Logout"}
        onPress={onLogout}
        color={theme === "dark" ? "#FF6B6B" : "#007bff"}
      />
      <Text style={[themeStyles.text, styles.taskHeader]}>
        {language === "es" ? "Tareas Agendadas" : "Scheduled Tasks"}
      </Text>
      <FlatList
  data={expandedTasks}
  keyExtractor={(item, index) => {
    // Verificar si el ID es único
    const uniqueKey = item.id || `${item.title}-${index}`;
    console.log("Generated key:", uniqueKey); // Log para depuración
    return uniqueKey;
  }}
  renderItem={({ item }) => (
    <View style={styles.taskCard}>
      <Text style={[themeStyles.text, styles.taskTitle]}>
        {item.title || (language === "es" ? "Sin título" : "Untitled")}
      </Text>
      <Text style={themeStyles.text}>
        {item.fechaHora
          ? new Date(item.fechaHora).toLocaleString(
              language === "es" ? "es-ES" : "en-US"
            )
          : language === "es"
          ? "Fecha no válida"
          : "Invalid date"}
      </Text>
      <Text style={themeStyles.text}>
        {item.recurrencia || (language === "es" ? "Sin recurrencia" : "No recurrence")}
      </Text>
    </View>
  )}
  ListEmptyComponent={
    <Text style={themeStyles.text}>
      {language === "es"
        ? "No hay tareas programadas."
        : "No scheduled tasks."}
    </Text>
  }
/>
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  listContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  taskCard: {
    width: screenWidth * 0.9,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});