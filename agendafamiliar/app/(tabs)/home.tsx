import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Image } from 'react-native';
import TaskCard from '../../components/TaskCard';

// Definimos la interfaz para el usuario
interface User {
  email: string;
  password: string;
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
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/home.png')} style={styles.perfil} />
      <Text style={styles.text}>Bienvenido, {user.email}</Text>
      <Button title="Cerrar Sesión" onPress={onLogout} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 60, // Ajustar el padding inferior para dejar espacio para la barra de navegación
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
text: {
  fontSize: 18, // Tamaño de fuente más grande para mayor énfasis
  fontWeight: 'bold', // Texto en negrita para resaltar
  color: '#333333', // Color de texto más oscuro para mejor legibilidad
  textAlign: 'center', // Centrar el texto horizontalmente
  marginBottom: 20, // Mantén el espacio inferior
},
  list: {
    paddingBottom: 60, // Ajustar el padding inferior a la lista también
  },
});
