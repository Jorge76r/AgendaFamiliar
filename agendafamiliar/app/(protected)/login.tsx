import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Image,
} from "react-native";
import CustomInput from "../../components/CustomInput";
import { useTheme } from "@/contexts/ThemeContext"; // Contexto de tema
import { lightTheme, darkTheme } from "@/styles/themes"; // Temas definidos
import { useLanguage } from "@/contexts/LanguageContext"; // Contexto de idioma

export default function LoginScreen({ onLogin }: { onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme(); // Tema dinámico
  const { language } = useLanguage(); // Idioma dinámico
  const themeStyles = theme === "dark" ? darkTheme : lightTheme; // Asignación del tema

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
    if (!email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://192.168.1.48:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Inicio de sesión exitoso:", data);
        onLogin(email, password);
      } else if (response.status === 401) {
        setError(language === "es" ? "Credenciales inválidas" : "Invalid credentials");
      } else {
        setError(language === "es" ? "Error en el servidor, inténtelo más tarde" : "Server error, please try again later");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      setError(language === "es" ? "Error al conectar con el servidor" : "Error connecting to the server");
    }

    setLoading(false);
  };

  return (
    <View style={themeStyles.container}>
      <Image source={require("../../assets/images/logo.png")} style={styles.logo} />
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
        keyboardType="default"
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
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
});
