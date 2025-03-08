import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

// Definimos la interfaz para el usuario
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
}

interface HomeScreenProps {
  user: User;
  onLogout: () => void;
  tasks: Task[];
}

export default function HomeScreen({ user, onLogout, tasks }: HomeScreenProps) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  return (
    <View style={[styles.container, themeStyles.container]}>
      <Image source={require('../../assets/images/home.png')} style={styles.perfil} />
      <Text style={[styles.text, themeStyles.text]}>
        {language === "es" ? `Bienvenido, ${user.email}` : `Welcome, ${user.email}`}
      </Text>
      <Button
        title={language === "es" ? "Cerrar Sesión" : "Logout"}
        onPress={onLogout}
      />
      <Text style={[styles.text, themeStyles.text]}>
        {language === "es" ? "Tareas Agendadas" : "Scheduled Tasks"}
      </Text>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskCard}>
            <Text style={styles.title}>{item.title} ({item.tipo})</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.dateTime}>
              {language === "es" ? "Fecha y Hora:" : "Date and Time:"} {item.fechaHora}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.list}
        style={{ width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60, // Ajustar para dejar espacio para la barra de navegación
    backgroundColor: '#F5F7FA',
  },
  perfil: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    alignSelf: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 60,
  },
  taskCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3, // Para Android
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 12,
    color: 'gray',
  },
});
