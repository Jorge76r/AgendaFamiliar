import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface HomeScreenProps {
  user: { email: string; password: string };
  onLogout: () => void;
  tasks: Array<{ title: string; description: string }>;
}

export default function Home({ user, onLogout, tasks }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido, {user.email}</Text>
      <Button title="Logout" onPress={onLogout} />
      <View style={styles.tasksContainer}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.task}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <Text style={styles.taskDescription}>{task.description}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  tasksContainer: {
    marginTop: 20,
  },
  task: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
  },
  taskTitle: {
    fontWeight: 'bold',
  },
  taskDescription: {
    marginTop: 5,
  },
});
