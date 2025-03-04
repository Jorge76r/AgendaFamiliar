import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

interface AnadirtareaProps {
  onAddTask: (title: string, description: string) => void;
}

export default function Anadirtarea({ onAddTask }: AnadirtareaProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { theme } = useTheme();
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert(language === "es" ? 'Error' : 'Error', language === "es" ? 'Por favor, completa todos los campos' : 'Please fill in all fields');
      return;
    }

    onAddTask(title, description);
    setTitle('');
    setDescription('');
    Alert.alert(language === "es" ? 'Éxito' : 'Success', language === "es" ? 'Tarea añadida correctamente' : 'Task added successfully');
  };

  return (
    <View style={(styles.perfil,themeStyles.container )}>
      <Image source={require('../../assets/images/anadirtarea.png')} style={styles.perfil} />
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder={language === "es" ? "Título de la tarea" : "Task title"}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, themeStyles.input]}
        placeholder={language === "es" ? "Descripción de la tarea" : "Task description"}
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title={language === "es" ? "Añadir Tarea" : "Add Task"} onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  perfil: {
    width: 150, // Ajusta el ancho del rectángulo
    height: 150, // Ajusta la altura del rectángulo
    marginBottom: 20,//Margen inferior para no estar pegados
    borderRadius: 10, // Redondea los bordes de la imagen
    borderWidth: 2, // Añade un borde a la imagen
    borderColor: 'gray', // Color del borde
    alignSelf: 'center', // Centrar la imagen horizontalmente
  },
  input: {
    height: 40,
    borderColor: 'var(--input-border, gray)', // Usar variable CSS con un valor por defecto
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    color: 'var(--input-color, #333)', // Usar variable CSS con un valor por defecto
    backgroundColor: 'var(--input-background, #fff)', // Usar variable CSS con un valor por defecto
  },
});
