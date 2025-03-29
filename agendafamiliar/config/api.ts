import { Platform } from "react-native";

// Configuración de direcciones base
const LOCALHOST = "localhost:5053"; // Backend local
const EMULATOR_HOST = "192.168.1.48:5053"; // Para emulador Android
const DEVICE_HOST = "192.168.1.48:5053"; // Cambia por la IP local de tu computadora (mismo Wi-Fi)

// Configuración para devolver la URL base según el entorno
export const BASE_URL =
  Platform.OS === "android"
    ? (__DEV__ ? `http://${EMULATOR_HOST}` : `http://${DEVICE_HOST}`)
    : `http://${LOCALHOST}`;
    console.log("BASE_URL actual:", BASE_URL);