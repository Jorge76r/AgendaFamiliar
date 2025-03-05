import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import TaskCard from '../../components/TaskCard';
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

interface User {
  email: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
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
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
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
});
