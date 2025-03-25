import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput"; // Campo de entrada personalizado
import { useTheme } from "@/contexts/ThemeContext"; // Manejo de tema dinámico
import { useLanguage } from "@/contexts/LanguageContext"; // Manejo de idioma
import { lightTheme, darkTheme } from "@/styles/themes"; // Temas claro y oscuro
import { useDispatch } from "react-redux"; // Redux para manejar el estado global
import { registerUser } from "../store/slices/userSlice"; // Acción para registrar usuario

interface RegisterScreenProps {
  onRegisterComplete: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onRegisterComplete, onNavigateToLogin }: RegisterScreenProps) {
  const [name, setName] = useState(""); // Nombre del usuario
  const [email, setEmail] = useState(""); // Correo del usuario
  const [password, setPassword] = useState(""); // Contraseña del usuario
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores en el formulario

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme(); // Tema dinámico
  const { language } = useLanguage(); // Idioma dinámico
  const dispatch = useDispatch(); // Para disparar acciones de Redux
  const themeStyles = theme === "dark" ? darkTheme : lightTheme; // Estilo dinámico según el tema

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

  const handleRegister = () => {
    // Validar que todos los campos estén completos
    if (!name || !email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    // Validar formato del correo (opcional)
    if (!email.includes("@")) {
      setError(language === "es" ? "Correo electrónico inválido" : "Invalid email address");
      return;
    }

    // Validar longitud mínima de la contraseña (opcional)
    if (password.length < 6) {
      setError(
        language === "es"
          ? "La contraseña debe tener al menos 6 caracteres"
          : "Password must be at least 6 characters long"
      );
      return;
    }

    setError(""); // Limpiar errores previos
    setLoading(true); // Mostrar indicador de carga

    try {
      // Disparar la acción de registro en Redux
      dispatch(registerUser({ name, email, password }));

      // Mostrar mensaje de éxito y navegar al login
      Alert.alert(
        language === "es" ? "Registro Exitoso" : "Registration Successful",
        language === "es" ? "Tu cuenta ha sido creada." : "Your account has been created.",
        [{ text: "OK", onPress: () => onNavigateToLogin() }]
      );

      // Limpiar los campos después del registro
      setName("");
      setEmail("");
      setPassword("");

      // Ejecutar la función que maneja el registro completo
      onRegisterComplete();
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(language === "es" ? "Error al registrar usuario" : "Error registering user");
    }

    setLoading(false); // Ocultar indicador de carga
  };

  return (
    <View style={themeStyles.container}>
      {/* Campo para el nombre */}
      <CustomInput
        label={language === "es" ? "Nombre" : "Name"}
        value={name}
        onChangeText={setName}
        style={themeStyles.input}
        labelStyle={themeStyles.text}
      />

      {/* Campo para el correo electrónico */}
      <CustomInput
        label={language === "es" ? "Correo Electrónico" : "Email"}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={themeStyles.input}
        labelStyle={themeStyles.text}
      />

      {/* Campo para la contraseña */}
      <CustomInput
        label={language === "es" ? "Contraseña" : "Password"}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={themeStyles.input}
        labelStyle={themeStyles.text}
      />

      {/* Mostrar errores */}
      {error ? <Text style={themeStyles.error}>{error}</Text> : null}

      {/* Indicador de carga o botón de registro */}
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity
          style={themeStyles.button}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handleRegister}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#4A90E2", width: fillWidth, borderRadius: 10 },
            ]}
          />
          <Text style={[themeStyles.buttonText, { zIndex: 1 }]}>
            {language === "es" ? "Registrar" : "Register"}
          </Text>
        </TouchableOpacity>
      )}

      {/* Botón para navegar al login */}
      <TouchableOpacity onPress={onNavigateToLogin} style={{ marginTop: 20 }}>
        <Text style={themeStyles.linkText}>
          {language === "es" ? "¿Ya tienes cuenta? Inicia Sesión" : "Already have an account? Login"}
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