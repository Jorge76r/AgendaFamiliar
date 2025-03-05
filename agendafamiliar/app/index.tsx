import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from './(tabs)/_layout';
import LoginScreen from './(protected)/login';

// Definimos el tipo del usuario con solo el correo
interface User {
  email: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null); // Estado para el usuario (correo)
  const [token, setToken] = useState<string | null>(null); // Estado para el token

  // Maneja el inicio de sesión, separando el correo del token
  const handleLogin = (email: string, token: string) => {
    setUser({ email }); // Almacena solo el correo del usuario
    setToken(token);    // Almacena el token por separado
  };

  // Maneja el cierre de sesión limpiando ambos estados
  const handleLogout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <ThemeProvider>
      <LanguageProvider>
        <View style={styles.container}>
          {user ? (
            <Layout user={user} onLogout={handleLogout} />
          ) : (
            <LoginScreen onLogin={handleLogin} />
          )}
        </View>
      </LanguageProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
