import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux"; // Importar Provider de Redux
import { store } from "../store/store"; // Importar el store configurado
import LoginScreen from "./login";
import RegisterScreen from "./register";
import Layout from "./(tabs)/_layout";

interface User {
  email: string;
  password: string;
}

export default function Index() {
  const [user, setUser] = useState<User | null>(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (email: string, password: string) => {
    setUser({ email, password });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleRegisterComplete = () => {
    setShowRegister(false); // Regresa al Login después de completar el registro
  };

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {user ? (
          <Layout user={user} onLogout={handleLogout} />
        ) : showRegister ? (
          <RegisterScreen
            onRegisterComplete={handleRegisterComplete}
            onNavigateToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginScreen
            onLogin={handleLogin}
            onRegister={() => setShowRegister(true)}
          />
        )}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
