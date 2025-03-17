import React from "react";
import { View, Text, FlatList, Button, Image, StyleSheet, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "@/styles/themes";
import { RootState } from "../../store/store";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const tasks = useSelector((state: RootState) => state.tasks);
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const expandedTasks = tasks.flatMap(generateOccurrences);

  return (
    <View style={themeStyles.container}>
      {/* Sección de bienvenida con la imagen */}
      <Image
        source={require("../../assets/images/home.png")}
        style={styles.logo}
      />
      <Text style={themeStyles.title}>
        {language === "es" ? "Bienvenido" : "Welcome"},{" "}
        {user?.email || (language === "es" ? "invitado" : "guest")}
      </Text>
      <Button
        title={language === "es" ? "Cerrar Sesión" : "Logout"}
        onPress={onLogout}
        color={theme === "dark" ? "#FF6B6B" : "#007bff"}
      />

      {/* Tareas programadas */}
      <Text style={[themeStyles.text, styles.taskHeader]}>
        {language === "es" ? "Tareas Agendadas" : "Scheduled Tasks"}
      </Text>
      <FlatList
        data={expandedTasks}
        keyExtractor={(item) => item.id + item.fechaHora}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={[themeStyles.text, styles.taskTitle]}>
              {item.title}
            </Text>
            <Text style={themeStyles.text}>
              {new Date(item.fechaHora).toLocaleString(
                language === "es" ? "es-ES" : "en-US"
              )}
            </Text>
            <Text style={themeStyles.text}>{item.recurrencia}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={themeStyles.text}>
            {language === "es"
              ? "No hay tareas programadas."
              : "No scheduled tasks."}
          </Text>
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width; // Ancho de la pantalla

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
    width: screenWidth * 0.9, // Ocupa el 90% del ancho de la pantalla
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignSelf: "center", // Centrar horizontalmente
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
