import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Definimos la interfaz para Task
interface Task {
  id: string;
  title: string;
  description: string;
}

export default function TaskCard({ task }: { task: Task }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
