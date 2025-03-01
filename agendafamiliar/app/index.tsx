import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Layout from './(tabs)/_layout'; // Asegúrate de que la ruta sea correcta
import LoginScreen from './(protected)/login';

// Definimos la interfaz para el usuario
interface User {
  email: string;
  password: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string) => {
    setUser({ email, password });
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={styles.container}>
      {user ? <Layout user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
