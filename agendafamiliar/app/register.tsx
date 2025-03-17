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
import CustomInput from "../components/CustomInput";
import { useTheme } from "@/contexts/ThemeContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { lightTheme, darkTheme } from "@/styles/themes";
import { useDispatch } from "react-redux"; // Importar useDispatch para Redux
import { registerUser } from "../store/slices/userSlice"; // Acción de Redux para registrar usuarios

interface RegisterScreenProps {
  onRegisterComplete: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({ onRegisterComplete, onNavigateToLogin }: RegisterScreenProps) {
  const [name, setName] = useState(""); // Campo adicional para el nombre del usuario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme(); // Tema dinámico
  const { language } = useLanguage(); // Idioma dinámico
  const dispatch = useDispatch(); // Para disparar acciones de Redux
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

  const handleRegister = () => {
    if (!name || !email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Llamada a Redux para guardar el usuario
      dispatch(registerUser({ name, email, password }));

      Alert.alert(
        language === "es" ? "Registro Exitoso" : "Registration Successful",
        language === "es" ? "Tu cuenta ha sido creada." : "Your account has been created."
      );
      onRegisterComplete(); // Navegar de regreso al login después del registro
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(language === "es" ? "Error al registrar usuario" : "Error registering user");
    }

    setLoading(false);
  };

  return (
    <View style={themeStyles.container}>
      {/* Campo para el nombre del usuario */}
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

      {error ? <Text style={themeStyles.error}>{error}</Text> : null}
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

      {/* Botón para volver al login */}
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
