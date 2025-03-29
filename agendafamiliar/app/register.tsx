import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import CustomInput from "../components/CustomInput"; // Entrada personalizada
import axios from "axios";
import { BASE_URL } from "@/config/api"; // Configuración de la API

interface RegisterScreenProps {
  onRegisterComplete: () => void;
  onNavigateToLogin: () => void;
}

export default function RegisterScreen({
  onRegisterComplete,
  onNavigateToLogin,
}: RegisterScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    console.log("BASE_URL actual:", BASE_URL); // Log para depuración
    console.log("Intentando registrar usuario con los datos:", {
      Nombre: name,
      Email: email,
      Clave: password,
    });

    // Validaciones básicas de campos
    if (!name || !email || !password) {
      setError("Por favor completa todos los campos");
      return;
    }
    if (!email.includes("@")) {
      setError("Correo electrónico inválido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // Enviar solicitud al backend
      const response = await axios.post(`${BASE_URL}/api/usuarios`, {
        Nombre: name,
        Email: email,
        Clave: password,
      });

      // Validar respuesta
      if (response.status === 200) {
        Alert.alert(
          "Registro exitoso",
          "Tu cuenta ha sido creada exitosamente",
          [{ text: "OK", onPress: onNavigateToLogin }]
        );
        console.log("Usuario registrado correctamente:", response.data);
        setName("");
        setEmail("");
        setPassword("");
        onRegisterComplete();
      }
    } catch (error: any) {
      console.error("Error al registrar usuario:", error.response?.data || error.message);
      setError(`Error al registrar usuario. Intenta nuevamente. ${BASE_URL}` );
    }

    setLoading(false);
  };
  
  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Campo para el nombre */}
      <CustomInput
        label="Nombre"
        value={name}
        onChangeText={setName}
      />
      {/* Campo para el correo */}
      <CustomInput
        label="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      {/* Campo para la contraseña */}
      <CustomInput
        label="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      {/* Mostrar mensaje de error si existe */}
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
      {/* Indicador de carga o botón */}
      {loading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#4A90E2",
            padding: 12,
            alignItems: "center",
            borderRadius: 8,
          }}
          onPress={handleRegister}
        >
          <Text style={{ color: "#FFF", fontSize: 16 }}>Registrar</Text>
        </TouchableOpacity>
      )}
      {/* Navegar a Login */}
      <TouchableOpacity
        onPress={onNavigateToLogin}
        style={{ marginTop: 16, alignItems: "center" }}
      >
        <Text style={{ color: "#4A90E2" }}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}