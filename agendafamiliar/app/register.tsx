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
import { useTheme } from "@/contexts/ThemeContext"; // Contexto de tema
import { lightTheme, darkTheme } from "@/styles/themes"; // Temas definidos
import { useLanguage } from "@/contexts/LanguageContext"; // Contexto de idioma
import AsyncStorage from "@react-native-async-storage/async-storage";

interface RegisterScreenProps {
  onRegisterComplete: () => void;
}

export default function RegisterScreen({ onRegisterComplete }: RegisterScreenProps) {
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

  const handleRegister = async () => {
    if (!email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const userData = { email, password };
      await AsyncStorage.setItem("registeredUser", JSON.stringify(userData));
      console.log("Usuario registrado y guardado:", userData);
      Alert.alert(
        language === "es" ? "Registro Exitoso" : "Registration Successful",
        language === "es" ? "Tu cuenta ha sido creada." : "Your account has been created."
      );
      onRegisterComplete(); // Navegar al login
    } catch (error) {
      console.error("Error al registrar:", error);
      setError(language === "es" ? "Error al registrar usuario" : "Error registering user");
    }

    setLoading(false);
  };

  return (
    <View style={themeStyles.container}>
      
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
