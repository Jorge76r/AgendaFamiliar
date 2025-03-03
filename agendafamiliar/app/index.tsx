import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeProvider } from "@/contexts/ThemeContext";  // Importar ThemeProvider
import { LanguageProvider } from "@/contexts/LanguageContext";  // Importar LanguageProvider
import Layout from './(tabs)/_layout';
import LoginScreen from './(protected)/login';

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
    <ThemeProvider>  
      <LanguageProvider>  
        <View style={styles.container}>
          {user ? <Layout user={user} onLogout={handleLogout} /> : <LoginScreen onLogin={handleLogin} />}
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
