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
import CustomInput from "../components/CustomInput"; // Campo de entrada personalizado
import { useTheme } from "@/contexts/ThemeContext"; // Manejo de tema dinámico
import { lightTheme, darkTheme } from "@/styles/themes"; // Temas claro y oscuro
import { useLanguage } from "@/contexts/LanguageContext"; // Manejo de idioma
import { useDispatch, useSelector } from "react-redux"; // Importar Redux
import { loginUser } from "../store/slices/userSlice"; // Acción para validar login
import { RootState } from "../store/store"; // Tipos para acceder al estado global

interface LoginScreenProps {
  onLogin: (email: string, password: string) => void;
  onRegister: () => void;
}

export default function LoginScreen({ onLogin, onRegister }: LoginScreenProps) {
  const [email, setEmail] = useState(""); // Campo para correo electrónico
  const [password, setPassword] = useState(""); // Campo para contraseña
  const [loading, setLoading] = useState(false); // Indicador de carga
  const [error, setError] = useState(""); // Manejo de errores

  const animationValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme(); // Tema dinámico
  const { language } = useLanguage(); // Idioma dinámico
  const themeStyles = theme === "dark" ? darkTheme : lightTheme; // Estilo según el tema

  const dispatch = useDispatch(); // Para disparar acciones de Redux
  const loggedInUser = useSelector((state: RootState) => state.user); // Acceder al estado del usuario

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

  const handleLogin = () => {
    if (!email || !password) {
      setError(language === "es" ? "Por favor, complete todos los campos" : "Please fill in all fields");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Disparar la acción para validar credenciales
      dispatch(loginUser({ email, password }));

      if (loggedInUser.email && loggedInUser.email === email) {
        Alert.alert(
          language === "es" ? "Inicio de sesión exitoso" : "Login Successful",
          language === "es" ? `Bienvenido ${loggedInUser.name}` : `Welcome ${loggedInUser.name}`
        );

        // Llamar la función para manejar el login
        onLogin(email, password);
      } else {
        setError(language === "es" ? "Credenciales inválidas" : "Invalid credentials");
      }
    } catch (error) {
      console.error("Error al validar:", error);
      setError(language === "es" ? "Error en el inicio de sesión" : "Login error");
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