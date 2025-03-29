import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput";
import axios from "axios";
import { useTheme } from "@/contexts/ThemeContext";
import { lightTheme, darkTheme } from "@/styles/themes";
import { useLanguage } from "@/contexts/LanguageContext";
import { BASE_URL } from "@/config/api";

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
}

export default function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();
  const { language } = useLanguage();
  const themeStyles = theme === "dark" ? darkTheme : lightTheme;

  const handlePressIn = () => {
    Animated.timing(animationValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animationValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const fillWidth = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const handleLogin = async () => {
    console.log("BASE_URL actual:", BASE_URL);
    console.log("Intentando iniciar sesión con:", { email, password });

    if (!email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/api/usuarios`);
      console.log("Usuarios obtenidos:", response.data);

      const usuario = response.data.find(
        (user: any) => user.email === email && user.clave === password
      );

      if (usuario) {
        Alert.alert(
          language === "es" ? "Inicio de sesión exitoso" : "Login Successful",
          language === "es" ? `Bienvenido ${usuario.nombre}` : `Welcome ${usuario.nombre}`
        );
        onLogin(email, password);
      } else {
        setError(language === "es" ? "Credenciales inválidas" : "Invalid credentials");
      }
    } catch (error: any) {
      console.error("Error al intentar obtener usuarios:", error.message);
      setError(language === "es" ? "Error al intentar iniciar sesión" : "Error trying to log in");
    }

    setLoading(false);
  };

  return (
    <View style={themeStyles.container}>
      <Image source={require("../assets/images/logo.png")} style={styles.logo} />
      <CustomInput
        label={language === "es" ? "Correo Electrónico" : "Email"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={themeStyles.input}
        labelStyle={themeStyles.text}
      />
      <CustomInput
        label={language === "es" ? "Contraseña" : "Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={themeStyles.input}
        labelStyle={themeStyles.text}
      />
      {error ? <Text style={themeStyles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity
          style={themeStyles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleLogin}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#4A90E2", width: fillWidth, borderRadius: 10 },
            ]}
          />
          <Text style={[themeStyles.buttonText, { zIndex: 1 }]}>
            {language === "es" ? "Ingresar" : "Login"}
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={onRegister} style={{ marginTop: 20 }}>
        <Text style={themeStyles.linkText}>
          {language === "es" ? "¿No tienes cuenta? Regístrate" : "Don't have an account? Register"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});