import { Platform } from "react-native";
//para web o utilizar en la computadora
const LOCALHOST = "localhost:5053";

//para emulador android
const EMULATOR_HOST = "10.0.2.2:5053";

//dispositivo fisico (expo go) utilizando la ip de la computadora
const DEVICE_HOST = "192.168.1.48:5053";

export const BASE_URL =
  Platform.OS === "android"
    ? (__DEV__ ? `http://${EMULATOR_HOST}` : `http://${DEVICE_HOST}`)
    : `http://${LOCALHOST}`;
