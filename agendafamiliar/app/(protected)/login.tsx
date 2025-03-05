import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, StyleSheet, Platform } from 'react-native';
import CustomInput from "../../components/CustomInput";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { darkTheme, lightTheme } from "@/styles/themes";

interface LoginScreenProps {
  onLogin: (email: string, token: string) => void; // Aceptamos tanto el correo como el token
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const baseURL = Platform.select({
    ios: 'http://localhost:3000',
    android: 'http://192.168.1.48:3000', // Ajusta la IP según tu entorno
  });

  const handleLogin = async () => {
    console.log("Email introducido:", email);
    console.log("Password introducida:", password);

    if (!email || !password) {
      setError(language === "es" ? 'Por favor, complete todos los campos' : 'Please fill in all fields');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      console.log("Respuesta del servidor:", result);

      if (response.ok && result.token) {
        console.log("Token recibido:", result.token);
        onLogin(email, result.token); // Pasamos el email y el token al componente principal
      } else {
        setError(language === "es" ? 'Credenciales inválidas' : 'Invalid credentials');
      }
    } catch (error) {
      console.log("Error capturado:", error);
      setError(language === "es" ? 'Error en la autenticación' : 'Authentication error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={themeStyles.container}>
      <View style={themeStyles.content}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <CustomInput
          label={language === "es" ? "Correo Electrónico" : "Email"}
          value={email}
          onChangeText={(text) => setEmail(text.trim())}
          keyboardType="email-address"
          style={themeStyles.input}
          labelStyle={themeStyles.text}
        />
        <CustomInput
          label={language === "es" ? "Contraseña" : "Password"}
          value={password}
          onChangeText={(text) => setPassword(text.trim())}
          keyboardType="numeric"
          secureTextEntry={true}
          style={themeStyles.input}
          labelStyle={themeStyles.text}
        />

        {error ? <Text style={themeStyles.error}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator size="large" color="#4A90E2" />
        ) : (
          <TouchableOpacity style={themeStyles.button} onPress={handleLogin}>
            <Text style={themeStyles.buttonText}>{language === "es" ? "Ingresar" : "Login"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    borderColor: 'gray',
    alignSelf: 'center',
  },
});
