import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';

interface AnadirtareaProps {
  onAddTask: (title: string, description: string) => void;
}

export default function Anadirtarea({ onAddTask }: AnadirtareaProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Error', 'Por favor, completa todos los campos');
      return;
    }

    onAddTask(title, description);
    setTitle('');
    setDescription('');
    Alert.alert('Éxito', 'Tarea añadida correctamente');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/anadirtarea.png')} style={styles.perfil} />
      <TextInput
        style={styles.input}
        placeholder="Título de la tarea"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción de la tarea"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Añadir Tarea" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60, // Añadir un padding inferior para dejar espacio para la barra de navegación
    backgroundColor: '#F5F7FA',
  },
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
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});